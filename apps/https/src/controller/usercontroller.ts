import {prisma}from "@repo/db/prismauser"
import { Request, Response } from "express";
import {createUserSchema} from "@repo/zod/zod"
export const createUser = async(req:Request,res:Response)=>{  
try{
   const parseddata= createUserSchema.safeParse(req.body)
   if(!parseddata.success){
    return res.status(400).json({error:"invalid data "})
   }
  const user = await prisma.user.create({
    data:{
        name:parseddata.data.name,
        email:parseddata.data?.email,
        password:parseddata.data?.password
    }
  })
}
 catch(error){
    res.status(400).json({ error:"error in creating user" })
}
}