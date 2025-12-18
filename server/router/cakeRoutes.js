import express from "express"
import { addCake, getCakes } from "../controller/productCake.js"
import userAuth from "../middleware/auth.js"
import upload from "../middleware/multer.js"


const cakeRouter = express.Router()

cakeRouter.post("/add",upload.array("imageFiles", 4),userAuth, addCake)
cakeRouter.get("/get", getCakes)

export default cakeRouter
