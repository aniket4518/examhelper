import { prisma } from "../config/prisma.js";

interface FileData {
  url: string;
  publicId: string;
  originalName: string;
  mimeType: string;
  size: number;
}

export const uploadtodb = async (files: FileData[], userId: string) => {
  try {
    const uploadedFiles = await prisma.fileUpload.createMany({
      data: files.map((file) => ({
        url: file.url,
        filename: file.originalName,
        userId: userId,
      })),
    });

    return uploadedFiles;
  } catch (error) {
    console.error("Error uploading files to database:", error);
    throw error;
  }
};

export const getFilesFromDb = async (userId: string) => {
  try {
    const files = await prisma.fileUpload.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        url: true,
        filename: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return files;
  } catch (error) {
    console.error("Error fetching files from database:", error);
    throw error;
  }
};
