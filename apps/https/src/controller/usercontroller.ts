import { prisma } from "@repo/db";
import { Request, Response } from "express";
import {createToken} from "../service/authservice"
import bcrypt from "bcrypt"
import { createUserSchema, signInSchema } from "@repo/zod/zod";

export const createUser = async (req: Request, res: Response) => {
  try {
    const parseddata = createUserSchema.safeParse(req.body);
    if (!parseddata.success) {
      return res.status(400).json({ error: "faild to parse the create user data " });
    }
    const password =parseddata.data.password
    const hashedPassword =  await bcrypt.hash(password,10)
     await prisma.user.create({
      data: {
        name: parseddata.data.name,
        email: parseddata.data.email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    res.status(400).json({ error: "error in creating user" });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const parseddata = signInSchema.safeParse(req.body);
    if(!parseddata.success){
      return res.status(400).json({error:"faild to parse the sigin data"})
    }
    const user = await prisma.user.findFirst({
      where:{
        email:parseddata.data.email,
      }
    })
    if(!user){
      return res.status(404).json({error:"userdoes not exist signup first"})
    }
    if (!user.password) {
      return res.status(400).json({ error: "This account uses Google sign-in. Please sign in with Google." });
    }
    const password=parseddata.data.password
     const isPasswordValid = await bcrypt.compare(password, user.password);
     if(!isPasswordValid){
      return res.status(401).json({error:"worng password"})
     }
      const userId=user?.id
      const token =  createToken(userId)
        res.json({ success: true, msg: "Logged in", token});
  } catch (error) {
    res.status(401).json({error:"failed to sigin"})
  }
};
