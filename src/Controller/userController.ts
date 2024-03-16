import { Request, Response } from "express";
import prisma from "../prisma";

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
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
