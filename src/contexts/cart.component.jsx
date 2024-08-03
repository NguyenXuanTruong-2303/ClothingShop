import { createContext, useEffect, useState } from "react";

// Thêm sản phẩm vào giỏ hàng
const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// Xoá sản phẩm 
const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
// Xóa hẳn sản phẩm ra khỏi giỏ hàng
const clearCartItem = (cartItems,cartItemToClear) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToClear.id
  );

  if(existingCartItem){
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
  }
};


//===========================================MAIN========================================================
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  cartTotal:0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // tính toán tổng sản phẩm trong giỏ hàng
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (count, cartItem) => count + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  // Tính toán tổng giá giỏ hàng
  useEffect(() => {
    const newCartTotal = cartItems.reduce((total,cartItem) => total + cartItem.price * cartItem.quantity, 0);
    setCartTotal(newCartTotal);
  },[cartItems]);

  // Thêm sản phẩm
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  // Xóa số lượng sản phẩm
  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };
  
  //Xóa hẳn sản phẩm
  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems,cartItemToClear))
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
