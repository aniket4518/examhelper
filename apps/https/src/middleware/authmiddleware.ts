import dotenv from 'dotenv'
dotenv.config()
import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
const JWT_SECRET=process.env.jwt_secret as string
export const AuthMiddleware=(req:Request,res:Response,next:NextFunction) => {
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).json({message:"No token provided"})
    }
    if(!authHeader.startsWith("Bearer")){
        return res.status(401).json({msg:"no bearer token provided"})
    }
    const token =authHeader.substring(7,authHeader.length)
    console.log("token in middelware is ", token)
    if(!token|| token===""){
    return res.status(401).json({message:"no token provided"})
    }
    const userid =jwt.verify(token,JWT_SECRET) as string
    if(!userid || typeof userid !=="string"){
      return res.status(401).json({msg:"user id id not prvided in required format"})
    }
    console.log("userid from auth middleware is ",userid)
     
    if(req.userId = userid){
        res.status(200).send(userid)
        next()
    }
}