import {z} from 'zod'
export const createUserSchema =z.object({
    name:z.string().min(3,"name should have min 3 characheters").max(100,"name should have max 100 characters"),
    email:z.string().min(1,"email should have min 1 character"),
    password:z.string().min(6,"pasword should have min 6 characters").max(50,"password should hav more than 50 characters")
})
export const RoomSchema =z.object({
    slag:z.string().min(3,"slag name should have min 3 characters")
})