import { createContext, useEffect, useState } from "react";
import { db } from "../firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";

export const CakeContext = createContext();

const CakeContextProvider = ({ children }) => {
  const [currency, setCurrency] = useState("£");
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItem, setCartItem] = useState(() => {
    const savedCart = localStorage.getItem("naija_cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const fetched = snapshot.docs.map(doc => ({
          _id: doc.id,
          ...doc.data()
        }));
        setProducts(fetched);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("naija_cart", JSON.stringify(cartItem));
  }, [cartItem]);

  const clearCart = () => {
    setCartItem({});
    localStorage.removeItem("naija_cart");
  };

  const addToCart = (itemId) => {
    let CartData = structuredClone(cartItem);
    CartData[itemId] = (CartData[itemId] || 0) + 1;
    setCartItem(CartData);
    toast.success("Sweet! Cake is in your cart.");
  };

  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItem);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) delete cartData[itemId];
    }
    setCartItem(cartData);
    toast.success("Cake removed from Cart");
  };

  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId] = quantity;
    setCartItem(cartData);
    toast.success("Cart Updated");
  };

  const getCartCount = () => {
    return Object.values(cartItem).reduce((sum, val) => sum + val, 0);
  };

  const getCartAmout = () => {
    let totalAmount = 0;
    for (const itemId in cartItem) {
      const itemInfo = products.find(p => p._id === itemId);
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItem[itemId];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  const handleSearch = (e) => {
    const value = (e.target.value)
    setSearchQuery(value)   
  }

  useEffect(()=>{
    console.log(searchQuery)
  },[searchQuery])

  const value = {
    currency,
    products,
    addToCart,
    removeFromCart,
    updateCartItem,
    getCartCount,
    cartItem,
    getCartAmout,
    clearCart,
    handleSearch,
    searchQuery,
    setSearchQuery
  };

  return (
    <CakeContext.Provider value={value}>
      {children}
    </CakeContext.Provider>
  );
};

export default CakeContextProvider;
