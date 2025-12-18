import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js";
import authRouter from "./router/authRouter.js";
import cakeRouter from "./router/cakeRoutes.js";

const app = express()
const port = process.env.PORT || 3000;
connectDB()

app.use(express.json())
app.use(cors({credentials: true}));

app.get("/", (req,res)=>res.send("API is working"));
app.use("/api/auth", authRouter)
app.use("/api/cake", cakeRouter)
app.get("/api/config", (req, res) => {
  res.json(apiLink: process.env.PAYPAL_CLIENT_ID);
});

app.listen(port, ()=> console.log(`Running in port: ${port}`))
