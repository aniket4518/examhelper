 import multer from "multer"
 declare module multer{
    interface File{
        filename:string;
        filepath:string;
    }
 }