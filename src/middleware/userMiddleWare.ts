import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Request, Response } from "express";
import { Lucia, TimeSpan } from "lucia";
import prisma from "../prisma";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(1, "d"),
});

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
    await lucia.invalidateUserSessions(id);

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

    try {
      const session = await lucia.createSession(user.id, { userId: user.id });
      console.log("session created ", session);

      const sessionCookie = lucia.createSessionCookie(session.id);
      res.setHeader("set-Cookie", sessionCookie.serialize());
      console.log("cookie défini", session.id);
    } catch (error) {
      console.error(
        "erreur lors de la création de la session ou du cookie de session",
        error,
      );
      return res.status(500).json({
        error: "une erreur est survenue lors de la création de la session",
      });
    }

    res.status(200).json({ message: "connexion réussie", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "une erreur est survenue" });
  }
};

export const getUserSessions = async (req: Request, res: Response) => {
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    return res.status(400).json({ error: "Aucune session active trouvée" });
  }

  try {
    const session = await lucia.getUserSessions(sessionId);

    if (!session) {
      return res.status(400).json({ error: "Session non trouvée" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session[0].userId,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "utilisateur non trouvé" });
    }

    res.json({ session, user });
  } catch (error) {
    console.error(
      "erreur lors de la récupération de la session ou des informations de l'utilisateur",
      error,
    );
    return res.status(500).json({
      error:
        "une erreur est survenue lors de la récupération de la session ou des informations de l'utilisateur",
    });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    return res.status(400).json({ error: "aucune session active" });
  }

  try {
    await lucia.invalidateSession(sessionId);

    res.clearCookie("sessionId");

    res.json({ message: "déconnexion réussie" });
  } catch (error) {
    console.error("erreur lors de la déconnexion", error);
    return res
      .status(500)
      .json({ error: "une erreur est survenue lors de la déconnexion" });
  }
};
