import React, { useContext, useEffect, useState } from 'react';
import { CakeContext } from '../context/CakeContext';
import { useNavigate, useParams } from 'react-router-dom';
import CategoryBreadCrumb from '../components/CategoryBreadCrumb';

const ProductDetails = () => {
  const { products, addToCart } = useContext(CakeContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => item._id === id);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (product?.image?.[0]) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  return product && (
    <div className='bg-bgcolor px-6 py-18'>
      <CategoryBreadCrumb/>
      <div className="max-w-6xl w-full ">
        <div className="flex flex-col md:flex-row gap-16 mt-4">
          
          <div className="hidden md:block px-6 flex items-center justify-center">
            <div className="flex gap-3 w-full">
              <div className="flex flex-col gap-3">
                {product.image.map((photo, index) => (
                  <div key={index} onClick={() => setThumbnail(photo)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer">
                    <img src={photo} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>

              <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                <img className="w-full h-full object-cover" src={thumbnail} alt="Selected product" />
              </div>
            </div>
          </div>

          
          <div className="flex flex-col gap-3 md:hidden">
            <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
              <img className='w-full h-full object-cover' src={thumbnail} alt="Selected product" />
            </div>

            <div className="flex gap-3">
              {product.image.map((photo, index) => (
                <div key={index} onClick={() => setThumbnail(photo)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer">
                  <img src={photo} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          
          <div className="text-sm w-full md:w-1/2">
            <p className="text-3xl font-medium">{product.name}</p>
            <div className="mt-6">
              <p className="text-2xl font-medium">Price: ${product.price}</p>
            </div>

            <p className="text-base font-medium mt-6 mb-2">About Cake</p>
            <ul className="list-disc ml-4 text-gray-600">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              
              <button
                onClick={() => {addToCart(product._id), navigate("/cart")}}
                className="w-full py-3.5 cursor-pointer rounded font-medium bg-primary text-white hover:bg-primary transition"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
