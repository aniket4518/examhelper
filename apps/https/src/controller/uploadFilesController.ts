import express from "express"
import {Request,Response } from "express"
export const uploadFiles=async(req:Request,res:Response)=>{
    try{
  if(!req.files){
    return res.status(400).send({msg:"no file uploaded"})
  }
  if ( !Array.isArray(req.files)){
  return res.status(200).json({msg:"file uploaded is not an array"})
  }
  const files= req.files.map((file)=> ({
     url: file.path,               
      publicId: file.filename,       
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size
  }))
  console.log(files)
  return res.status (200).json({
    files,
    count:files.length
  })
}

catch(error){
  res.status(400).json({msg:"error while uploading file",error})
}
}