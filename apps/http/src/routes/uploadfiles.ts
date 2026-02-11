import express, { Router } from "express"
import upload from "../middleware/multer.js"
import {AuthMiddleware} from "../middleware/authmiddleware.js"
import { uploadFiles, getFiles } from "../controller/uploadFilesController.js"

const router: Router = express.Router()
router.post('/', AuthMiddleware, upload.array("files", 3), uploadFiles)
router.get('/', AuthMiddleware, getFiles)
export default router