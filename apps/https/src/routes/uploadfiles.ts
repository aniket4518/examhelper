import express from "express"
import upload from "../middleware/multer.js"
 import { uploadFiles } from "../controller/uploadFilesController.js"

const router = express.Router()
export default function uploadroutes (){
 router.post('/',upload.array("uploads",3),uploadFiles)
}