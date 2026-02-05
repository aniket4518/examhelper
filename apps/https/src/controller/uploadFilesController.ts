import express from "express";
import type { Request, Response } from "express";
import { uploadtodb, getFilesFromDb } from "../service/uploadToDb.service.js";

export const uploadFiles = async (req: Request, res: Response) => {
  try {
    const userid = req.userId;
    if (!userid || typeof userid !== "string") {
      return res
        .status(401)
        .json({ msg: "user id is not provided login first to upload files" });
    }
    if (!req.files) {
      return res.status(400).send({ msg: "no file uploaded" });
    }
    if (!Array.isArray(req.files)) {
      return res.status(200).json({ msg: "file uploaded is not an array" });
    }
    const files = req.files.map((file) => ({
      url: file.path,
      publicId: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
    }));
    await uploadtodb(files, userid);
    console.log(files);
    return res.status(200).json({
      files,
      count: files.length,
    });
  } catch (error) {
    res.status(400).json({ msg: "error while uploading file", error });
  }
};

export const getFiles = async (req: Request, res: Response) => {
  try {
    const userid = req.userId;
    if (!userid || typeof userid !== "string") {
      return res
        .status(401)
        .json({ msg: "user id is not provided, login first to get files" });
    }

    const files = await getFilesFromDb(userid);

    return res.status(200).json({
      files,
      count: files.length,
    });
  } catch (error) {
    res.status(400).json({ msg: "error while fetching files", error });
  }
};
