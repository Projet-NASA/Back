import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { randomBytes } from "crypto";
import { Request, Response } from "express";
import { Lucia, TimeSpan } from "lucia";
import nodemailer from "nodemailer";
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
  try {
    const sessionId = req.headers.authorization;
    console.log("Session ID:", sessionId);
    if (!sessionId) {
      res
        .status(400)
        .json({ error: "No session ID provided usermiddlewar", sessionId });
      return;
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      res.status(404).json({ error: "Session not found" });
      return;
    }

    const retrievedUser = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    res.status(200).json(retrievedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "une erreur est survenue" });
  }
};

export const getInfoUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Aucun ID utilisateur trouvé" });
  }

  try {
    const retrievedUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!retrievedUser) {
      return res.status(400).json({ error: "utilisateur non trouvé" });
    }

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

function generateSessionId() {
  const timestamp = Date.now().toString();
  const randomNum = Math.floor(Math.random() * 1000).toString();
  return timestamp + randomNum;
}

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

    const sessionId = generateSessionId();
    console.log("Generated session: ", sessionId);

    try {
      await prisma.session.create({
        data: {
          id: sessionId,
          userId: user.id,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      res
        .status(200)
        .json({ message: "connexion réussie", user, sessionId: sessionId });
    } catch (error) {
      console.error("Error creating session: ", error);
      return res.status(500).json({
        error: "une erreur est survenue lors de la création de la session",
      });
    }
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

export const newGetUserSessions = async (req: Request, res: Response) => {
  const userId = req.headers;

  console.log("ici");
  if (!userId) {
    return res.status(400).json({ error: "Aucun ID utilisateur trouvé" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId.toString(),
      },
    });
    if (!user) {
      return res.status(400).json({ error: "utilisateur non trouvé" });
    }

    res.json({ user });
  } catch (error) {
    console.error(
      "erreur lors de la récupération des informations de l'utilisateur",
      error,
    );
    return res.status(500).json({
      error:
        "une erreur est survenue lors de la récupération des informations de l'utilisateur",
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

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "utilisateur non trouvé" });
    }

    const resetPasswordToken = randomBytes(20).toString("hex");
    const resetPasswordExpires = new Date(Date.now() + 14400000); // 4 heures

    await prisma.user.update({
      where: { email: email },
      data: {
        resetPasswordToken,
        resetPasswordExpires,
      },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Réinitialisation du mot de passe",
      text: `Cliquez sur ce lien pour réinitialiser votre mot de passe: http://localhost:3000/reset-password/${resetPasswordToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(
          "erreur lors de l'envoi de l'email de réinitialisation",
          error,
        );
        return res.status(500).json({
          error:
            "une erreur est survenue lors de l'envoi de l'email de réinitialisation",
        });
      }
      res.status(200).json({ message: "Email de réinitialisation envoyé" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "une erreur est survenue" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;
  console.log("1", token);
  console.log("2", password);

  try {
    const user = await prisma.user.findUnique({
      where: {
        resetPasswordToken: token,
      },
    });

    if (!user) {
      console.log("Token invalide ou expiré.", token);
      return res.status(400).send("Token invalide ou expiré.");
    }

    const now = new Date();
    if (user.resetPasswordExpires && user.resetPasswordExpires < now) {
      console.log("Token invalide ou expiré.", token);
      return res.status(400).send("Token invalide ou expiré.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashedPassword);
    await prisma.user.update({
      where: { resetPasswordToken: token },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    console.log("Le mot de passe a été réinitialisé avec succès.");
    res.send("Le mot de passe a été réinitialisé avec succès.");
  } catch (error) {
    console.error(error);
    console.log(
      "Une erreur est survenue lors de la réinitialisation du mot de passe.",
    );
    res
      .status(500)
      .send(
        "Une erreur est survenue lors de la réinitialisation du mot de passe.",
      );
  }
};

export const getUserIdFromSession = async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  try {
    const session = await prisma.session.findUnique({
      where: {
        id: sessionId,
      },
    });

    if (!session) {
      return res.status(400).json({ error: "session non trouvée" });
    }

    res.status(200).json({ userId: session.userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "une erreur est survenue" });
  }
};
