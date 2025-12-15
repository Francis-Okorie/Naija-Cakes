import mongoose from "mongoose";

const cakeSchema = new mongoose.Schema({
    productname: {type: String, required:true},
    productdesc: {type: String, required: true},
    productprice: {type: String, required: true},
    productimage: {type: [String], required: true},
    available:{type:Boolean, default: true}
})

const cakeModel = mongoose.model("cake", cakeSchema)

export default cakeModel;