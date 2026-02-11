import { prisma } from "../config/prisma.js";
import type { Request, Response } from "express";
import { createToken } from "../service/authservice.js";
import bcrypt from "bcrypt";
import { createUserSchema, signInSchema } from "@repo/zod/zod";

export const createUser = async (req: Request, res: Response) => {
  try {
    const parseddata = createUserSchema.safeParse(req.body);
    if (!parseddata.success) {
      return res
        .status(400)
        .json({ error: "Failed to validate signup data", details: parseddata.error.flatten().fieldErrors });
    }
    const password = parseddata.data.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: parseddata.data.name,
        email: parseddata.data.email,
        password: hashedPassword,
      },
    });
    // Auto-login: return token so user doesn't need to sign in separately
    const token = createToken(user.id);
    res.status(201).json({
      success: true,
      msg: "User created and logged in",
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(400).json({ error: "error in creating user" });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const parseddata = signInSchema.safeParse(req.body);
    if (!parseddata.success) {
      return res.status(400).json({ error: "faild to parse the sigin data" });
    }
    const user = await prisma.user.findFirst({
      where: {
        email: parseddata.data.email,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "userdoes not exist signup first" });
    }
    if (!user.password) {
      return res
        .status(400)
        .json({
          error:
            "This account uses Google sign-in. Please sign in with Google.",
        });
    }
    const password = parseddata.data.password;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "worng password" });
    }
    const userId = user?.id;
    const token = createToken(userId);
    res.json({
      success: true,
      msg: "Logged in",
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(401).json({ error: "failed to sigin" });
  }
};
