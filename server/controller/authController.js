import authModel from "../model/authModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const register = async(req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.json({success:false, message:"Enter email and password"});
    }

    try {
        const userExist = await authModel.findOne({email})

        if(userExist){
            return res.json({success:false, message:"User already exist"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = new authModel({email, password:hashedPassword})
        await user.save()
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.json({success:true, message: token})
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}


export const login = async(req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.json({success:false, message:"Enter email and password"});
    }

    try {
        const user = await authModel.findOne({email})
        if(!user){
            return res.json({success:false, message:"User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success:false, message:"Password is incorrect"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        res.json({success:true, message: token})
    } catch (error) {
        
    }
}