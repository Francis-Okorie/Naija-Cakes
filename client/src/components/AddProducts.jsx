import React, { useState } from 'react';
import { db } from '../firebase/Firebase';
import { addDoc, collection, Timestamp,doc,updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const AddProducts = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [previewImages, setPreviewImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      const updatedPreviews = [...previewImages];
      const updatedFiles = [...imageFiles];

      updatedPreviews[index] = previewURL;
      updatedFiles[index] = file;

      setPreviewImages(updatedPreviews);
      setImageFiles(updatedFiles);
    }
  };

  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const uploadImagesToCloudinary = async () => {
    const uploadedUrls = [];

    // Debug check
    console.log("Cloudinary ENV:", CLOUD_NAME, UPLOAD_PRESET);

    for (const file of imageFiles) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        console.log("Cloudinary response:", data); // ← Log response for debugging

        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        } else {
          throw new Error("Upload failed");
        }
      } catch (err) {
        console.error("Cloudinary upload error:", err);
        toast.error("Image upload failed");
        return null;
      }
    }

    return uploadedUrls;
  };




  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!name || !price || imageFiles.length === 0) {
      toast.error("Please fill all required fields");
      return;
    }

    const imageUrls = await uploadImagesToCloudinary();
    if (!imageUrls) return;

    const productData = {
      name,
      category: "Cakes",
      price: Number(price),
      image: imageUrls,
      description: description.split('\n').map(d => d.trim()).filter(Boolean),
      createdAt: Timestamp.now(),
    };

    try {
      const docRef = await addDoc(collection(db, "products"), {
        ...productData,
        _id: '', // temporarily empty
      });

      await updateDoc(doc(db, "products", docRef.id), {
        _id: docRef.id,
      });

      toast.success("Product added successfully!");
      setName('');
      setPrice('');
      setDescription('');
      setPreviewImages([]);
      setImageFiles([]);
    } catch (err) {
      console.error("Error adding product:", err);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="pb-10 flex flex-col justify-between bg-white">
      <form onSubmit={handleAddProduct} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[0, 1, 2, 3].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  accept="image/*"
                  type="file"
                  id={`image${index}`}
                  hidden
                  onChange={(e) => handleImageUpload(e, index)}
                />
                <img
                  className="max-w-24 cursor-pointer border border-gray-300"
                  src={previewImages[index] || "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"}
                  alt="uploadArea"
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label htmlFor="product-name">Product Name</label>
          <input
            id="product-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type here"
            className="outline-none py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label htmlFor="product-description">Product Description</label>
          <textarea
            id="product-description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="outline-none py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Enter each feature on a new line"
          ></textarea>
        </div>

        <div className="flex-1 flex flex-col gap-1 w-32">
          <label htmlFor="product-price">Product Price</label>
          <input
            id="product-price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0"
            className="outline-none py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        <button type="submit" className="px-8 py-2.5 bg-primary text-white font-medium rounded">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
