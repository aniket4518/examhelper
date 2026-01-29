import express from "express"
import upload from "../middleware/multer"
 import { uploadFiles } from "../controller/uploadFilesController"

const router = express.Router()
export default function uploadroutes (){
 router.post('/',upload.array("uploads",3),uploadFiles)
}