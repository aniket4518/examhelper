import {z} from 'zod'
export const createUserSchema =z.object({
    name:z.string().min(3,"name should have min 3 characheters").max(100,"name should have max 100 characters"),
    email:z.string().min(1,"email should have min 1 character").max(254,"email should have max 254 characters"),
    password:z.string().min(6,"pasword should have min 6 characters").max(50,"password should hav more than 50 characters")
})
export const RoomSchema =z.object({
    slag:z.string().min(3,"slag name should have min 3 characters")
})
export const signInSchema =z.object({
     email:z.string().min(1,"email should have min 1 character").max(254,"email should have max 254 characters"),
   password:z.string().min(6,"pasword should have min 6 characters").max(50,"password should hav more than 50 characters")
})
export const uploadFileSchema =z.object({
    fileName:z.string().min(1,"file name should have min 1 character").max(255,"file name should have max 255 characters"),
    fileSize:z.number().min(1,"file size should be at least 1 byte").max(20000000,"file size should not exceed 20 MB"),
    fileType:z.string().min(1,"file type should have min 1 character").max(100,"file type should have max 100 characters")
})