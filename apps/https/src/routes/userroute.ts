import express from 'express';
import {createUser} from '../controller/usercontroller.js'
const router = express.Router()
export default function userroutes(){
router.post('/', createUser,(req,res)=>{
    res.status(200).send({ msg:"user route is working"}) 
})
router.post('/signin',(req,res)=>{
 res.status(200).send({msg:"signin is working perfectly"})
})
}