import React, { useContext, useEffect, useState, useRef } from 'react';
import { assets } from '../assets/assets';
import { CakeContext } from '../context/CakeContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/Firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

const Cart = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Online');
  const [sdkReady, setSdkReady] = useState(false);
  const paypalRef = useRef();

  const navigate = useNavigate();
  const { cartItem, products, removeFromCart, currency, updateCartItem, getCartAmout, clearCart } = useContext(CakeContext);
  const [cartArray, setCartArray] = useState([]);

  const totalAmount = (getCartAmout() + 8).toFixed(2);

  const getArray = () => {
    let tempArray = [];
    for (const key in cartItem) {
      const product = products.find(item => item._id === key);
      if (product) {
        tempArray.push({ ...product, quantity: cartItem[key] });
      }
    }
    setCartArray(tempArray);
  };

  const sanitizeFullName = (value) => value.replace(/\s+/g, ' ').trim();

  const handleOrder = async () => {
    const cleanedFullName = fullName.trim();
    const cleanedAddress = address.trim();

    if (!cleanedFullName || !email || !cleanedAddress) {
      toast.error("Please fill in all fields properly.");
      return;
    }

    const orderData = {
      fullName: cleanedFullName,
      email,
      address: cleanedAddress,
      products: cartArray.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: parseFloat(totalAmount),
      createdAt: Timestamp.now()
    };

    try {
      await addDoc(collection(db, "orders"), orderData);
      toast.success("Order placed successfully!");
      clearCart();

      
      

      
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order.");
    }
  };

  useEffect(() => {
    if (!window.paypal) {
      const script = document.createElement("script");
      script.src = "https://www.paypal.com/sdk/js?client-id=AVcSJ9tu-u8QPUm0XrSg4KREH7kpEOzF39ngeuur2Jwtx9VSuLjlb1fqGz87Obj_qNidb9_BK3qg3qxn&currency=GBP";
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);
    } else {
      setSdkReady(true);
    }
  }, []);

  useEffect(() => {
  if (!sdkReady || paymentMethod !== 'Online' || cartArray.length === 0) return;
  if (!paypalRef.current) return;

  // Clear previous buttons if re-rendering
  paypalRef.current.innerHTML = '';

  console.log("Rendering PayPal Button");

  window.paypal.Buttons({
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: totalAmount,
            currency_code: "GBP"
          },
          description: "Cake Order"
        }]
      });
    },
    onApprove: async (data, actions) => {
      const details = await actions.order.capture();
      console.log('Payment Approved:', details);
      handleOrder();
    },
    onError: (err) => {
      console.error("PayPal Error:", err);
      toast.error("Payment failed. Try again.");
    }
  }).render(paypalRef.current);
}, [sdkReady, cartArray, totalAmount, paymentMethod]);


  useEffect(() => {
    if (products.length > 0 && cartItem) {
      getArray();
    }
  }, [products, cartItem]);

  return (
    <div className="bg-bgcolor pt-19 md:pt-7 px-3 md:px-12 lg:px-14 xl:px-30">
      <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
        {/* Left: Product & Form */}
        <div className='flex-1 max-w-4xl'>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-medium mb-6">Shopping Cart</span>
            <p className="text-sm text-primary">{cartArray.length} Item</p>
          </div>

          <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3 mt-5">
            <p className="text-left text-black">Product Details</p>
            <p className="text-center text-black">Subtotal</p>
            <p className="text-center text-black">Action</p>
          </div>

          {cartArray.length > 0 ? (
            cartArray.map((product, index) => (
              <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                <div className="flex items-center md:gap-6 gap-3">
                  <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                    <img className="max-w-full h-full object-cover rounded" src={product.image[0]} alt={product.name} />
                  </div>
                  <div>
                    <p className="hidden md:block font-semibold text-black">{product.name}</p>
                    <div className="font-normal text-black">
                      <p>Size: <span>{product.size || "N/A"}</span></p>
                      <div className="flex items-center gap-2">
                        <p>Qty:</p>
                        <select
                          value={product.quantity}
                          onChange={(e) => updateCartItem(product._id, Number(e.target.value))}
                          className="border border-gray-300 px-2 py-1 rounded outline-none"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-black">{currency}{product.price * product.quantity}</p>
                <button className="cursor-pointer mx-auto">
                  <img className='w-5 h-5' onClick={() => removeFromCart(product._id)} src={assets.delete_btn} alt="" />
                </button>
              </div>
            ))
          ) : (
            <div className='flex items-center justify-center p-10'>
              <p className="text-black mt-6">🛒 Your cart is empty.</p>
            </div>
          )}

          <button onClick={() => { navigate("/products") }} className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="#0E0F47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Continue Shopping
          </button>

          {cartArray.length > 0 && (
            <div className='bg-white p-5 mt-6 w-full md:w-[99%] lg:w-[80%]'>
              <h2 className="text-xl font-medium">Delivery Details</h2>
              <hr className="border-gray-300 my-3" />

              <div className='flex flex-col gap-4'>
                <div className="flex flex-col gap-4 md:flex-row w-full mt-4">
                  <div className='flex flex-col'>
                    <label>Full Name</label>
                    <input value={fullName} onChange={(e) => setFullName(sanitizeFullName(e.target.value))} className='border border-gray-300 p-1 outline-none placeholder:text-sm' type="text" placeholder='Enter your Fullname' />
                  </div>
                  <div className='flex flex-col'>
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className='border border-gray-300 p-1 outline-none placeholder:text-sm' type="email" placeholder='Enter your Email' />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <label>Address</label>
                  <input value={address} onChange={(e) => setAddress(e.target.value.trimStart())} className='border border-gray-300 p-1 outline-none placeholder:text-sm' type="text" placeholder='Enter your Home/Delivery address' />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Summary & Payment */}
        {cartArray.length > 0 && (
          <div className="max-w-[360px] w-full bg-white p-5 max-md:mt-16 border border-gray-300/70 self-start">
            <h2 className="text-xl font-medium">Order Summary</h2>
            <hr className="border-gray-300 my-5" />

            <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
            >
              
              <option value="Online">Online Payment (PayPal)</option>
            </select>

            <hr className="border-gray-300 my-5" />
            <div className="text-gray-500 mt-4 space-y-2">
              <div className="flex justify-between text-black">
                <p>Price</p><p>{currency}{getCartAmout()}</p>
              </div>
              <div className="flex justify-between text-black">
                <p>Delivery Fee</p><p className="">Starts from £8</p>
              </div>
              <div className="flex justify-between text-lg font-medium mt-3 text-black">
                <p>Total Amount:</p><p>{currency}{totalAmount}</p>
              </div>
            </div>

            {paymentMethod === "COD" ? (
              <button onClick={handleOrder} className="w-full py-3 mt-6 bg-primary text-white font-medium hover:bg-primary transition">
                Place Order
              </button>
            ) : (
              <div ref={paypalRef} className="mt-6" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
