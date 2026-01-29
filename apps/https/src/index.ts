 import express from 'express';
 import dotenv from 'dotenv'
dotenv.config();
import uploadroutes from './routes/uploadfiles.js';
import { fileURLToPath } from 'url';
import userroutes from './routes/userroute.js';
 
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ msg: "sever is perfectly running" });
});
app.use('/uploads',uploadroutes)
app.use("/user",userroutes)
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});