import cloudinary from "../config/cloudinary.js"
import multer from "multer"
import{ CloudinaryStorage} from "multer-storage-cloudinary"
import type {Request} from "express"
 
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req: Request, file) => {
    const userid = req.userId as string

    return {
      folder: `users/${userid}`,
      resource_type: "auto",
      public_id: ` ${Date.now()}-${file.originalname}`,
      overwrite: false
    };
  }
});

const upload = multer({storage,
    limits:{
         fileSize: 50 * 1024 * 1024, // 50MB
         files: 10
    },
 
})
export default upload
 
//   fieldNameSize?: number | undefined;
//             /** Maximum size of each form field value in bytes. (Default: 1048576) */
//             fieldSize?: number | undefined;
//             /** Maximum number of non-file form fields. (Default: Infinity) */
//             fields?: number | undefined;
//             /** Maximum size of each file in bytes. (Default: Infinity) */
//             fileSize?: number | undefined;
//             /** Maximum number of file fields. (Default: Infinity) */
//             files?: number | undefined;
//             /** Maximum number of parts (non-file fields + files). (Default: Infinity) */
//             parts?: number | undefined;
//             /** Maximum number of headers. (Default: 2000) */
//             headerPairs?: number | undefined;
// */