import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Lucia } from "lucia";
import prisma from "../prisma";

const client = new PrismaClient();

const adapter = new PrismaAdapter(client.session, client.user);

const lucia = new Lucia(adapter);

const bcrypt = require("bcrypt");

export const createUser = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    country,
    city,
    dateofbirth,
  } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(400).json({ error: "Cet Email est déjà utilisé" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "une erreur est survenue" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        country,
        city,
        dateofbirth,
      },
    });
    res.status(200).json({ message: "utilisateur ajouté avec succès", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "une erreur est survenue" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const retrievedUsers = await prisma.user.findMany();
    res.status(200).json(retrievedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "une erreur est survenue" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const retrievedUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(retrievedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "une erreur est survenue" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstName,
        lastName,
        email,
      },
    });
    res
      .status(200)
      .json({ message: "utilisateur mis à jour avec succès", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "une erreur est survenue" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "utilisateur supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "une erreur est survenue" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "utilisateur non trouvé" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "mot de passe incorrect" });
    }

    const session = await lucia.createSession(user.id, {});

    res.cookie("sessionId", session.id, { httpOnly: true });
    console.log("cookie set ", session.id);

    if (!process.env.JWT_SECRET) {
      throw new Error(" la clé JWT_SECRET n'est pas définie");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "connexion réussie", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "une erreur est survenue" });
  }
};
