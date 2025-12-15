import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    email: {type: String, require:true, unique: true},
    password: {type: String, require:true}
}) 

const authModel = mongoose.models.users || mongoose.model("users", authSchema);
export default authModel;