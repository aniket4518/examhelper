import express from "express";
import dotenv from "dotenv";
dotenv.config();
import uploadroutes from "./routes/uploadfiles.js";
import { fileURLToPath } from "url";
import userroutes from "./routes/userroute.js";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.get("/", (req, res) => {
  res.json({ msg: "sever is perfectly running" });
});
app.use("/uploads", uploadroutes);
app.use("/user", userroutes);
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
