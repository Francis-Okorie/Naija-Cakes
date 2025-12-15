import imagekit from "../config/imageKit.js";
import cakeModel from "../model/productCake.js";

export const addCake = async (req, res) => {
  try {
    const { productname, productdesc, productprice } = req.body;
    const imageFiles = req.files; // this is an array

    if (!productname || !productdesc || !productprice || !imageFiles || imageFiles.length === 0) {
      return res.json({ success: false, message: "Field cannot be empty" });
    }

    let uploadedImages = [];

    
    for (let file of imageFiles) {
      const response = await imagekit.upload({
        file: file.buffer,            // file content from multer memory storage
        fileName: file.originalname,  // original file name
        folder: "/cakes",
      });

      const optimizedImageUrl = imagekit.url({
        path: response.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
        ],
      });

      uploadedImages.push(optimizedImageUrl);
    }

    // Save cake with all image URLs
    const newCake = await cakeModel.create({
      productname,
      productdesc,
      productprice,
      productimage: uploadedImages,
    });

    res.json({
      success: true,
      message: "Products have been added",
      cake: newCake,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getCakes = async(req,res)=>{
    try {
        const cakes = await cakeModel.find({available:true})
        res.json({success:true, cakes})
    } catch (error) {
        res.json({success:false, message: error.message})
    }
}
