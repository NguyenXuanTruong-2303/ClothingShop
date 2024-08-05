// import { createContext, useEffect, useState } from "react";

// // Thêm sản phẩm vào giỏ hàng
// const addCartItem = (cartItems, productToAdd) => {
//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === productToAdd.id
//   );

//   if (existingCartItem) {
//     return cartItems.map((cartItem) =>
//       cartItem.id === productToAdd.id
//         ? { ...cartItem, quantity: cartItem.quantity + 1 }
//         : cartItem
//     );
//   }

//   return [...cartItems, { ...productToAdd, quantity: 1 }];
// };

// // Xoá sản phẩm
// const removeCartItem = (cartItems, cartItemToRemove) => {
//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === cartItemToRemove.id
//   );

//   if (existingCartItem.quantity === 1) {
//     return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
//   }

//   return cartItems.map((cartItem) =>
//     cartItem.id === cartItemToRemove.id
//       ? { ...cartItem, quantity: cartItem.quantity - 1 }
//       : cartItem
//   );
// };
// // Xóa hẳn sản phẩm ra khỏi giỏ hàng
// const clearCartItem = (cartItems, cartItemToClear) => {
//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === cartItemToClear.id
//   );

//   if (existingCartItem) {
//     return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
//   }
// };

// //===========================================MAIN========================================================
// export const CartContext = createContext({
//   isCartOpen: false,
//   setIsCartOpen: () => {},
//   cartItems: [],
//   addItemToCart: () => {},
//   removeItemFromCart: () => {},
//   cartCount: 0,
//   cartTotal: 0,
// });

// //================================= Provider===========================================================
// export const CartProvider = ({ children }) => {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [cartCount, setCartCount] = useState(0);
//   const [cartTotal, setCartTotal] = useState(0);

//   // tính toán tổng sản phẩm trong giỏ hàng
//   useEffect(() => {
//     const newCartCount = cartItems.reduce(
//       (count, cartItem) => count + cartItem.quantity,
//       0
//     );
//     setCartCount(newCartCount);
//   }, [cartItems]);

//   // Tính toán tổng giá giỏ hàng
//   useEffect(() => {
//     const newCartTotal = cartItems.reduce(
//       (total, cartItem) => total + cartItem.price * cartItem.quantity,
//       0
//     );
//     setCartTotal(newCartTotal);
//   }, [cartItems]);

//   // Thêm sản phẩm
//   const addItemToCart = (productToAdd) => {
//     setCartItems(addCartItem(cartItems, productToAdd));
//   };

//   // Xóa số lượng sản phẩm
//   const removeItemToCart = (cartItemToRemove) => {
//     setCartItems(removeCartItem(cartItems, cartItemToRemove));
//   };

//   //Xóa hẳn sản phẩm
//   const clearItemFromCart = (cartItemToClear) => {
//     setCartItems(clearCartItem(cartItems, cartItemToClear));
//   };

//   const value = {
//     isCartOpen,
//     setIsCartOpen,
//     addItemToCart,
//     removeItemToCart,
//     clearItemFromCart,
//     cartItems,
//     cartCount,
//     cartTotal,
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };

//==================================== Use Reducer=====================================================

import { createContext, useState, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

// Thêm sản phẩm
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

// Xóa sản phẩm
const removeCartItem = (cartItems, cartItemToRemove) => {
  // tìm mục giỏ hàng để xóa
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // kiểm tra xem số lượng có bằng 1 không, nếu bằng thì xóa sản phẩm đó khỏi giỏ hàng
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // trả lại các mặt hàng trong giỏ hàng có mặt hàng trong giỏ hàng phù hợp với số lượng đã giảm
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

// Xóa hẳn sản phẩm ra khỏi giỏ hàng ko quan tâm tới số lượng
const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_COUNT: "SET_CART_COUNT",
  SET_CART_TOTAL: "SET_CART_TOTAL",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

//======================================== Provider===========================================
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [{ cartCount, cartTotal, cartItems }, dispatch] = useReducer(cartReducer, INITIAL_STATE);


  // Update giỏ hàng , giá  sau mỗi lần thêm/xóa sản phẩm
  const updateCartItemsReducer = (cartItems) => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    const payload = {
      cartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal,
    };

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
  };

  // Thêm sản phẩm
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  // Xóa sản phẩm
  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  // Xóa hẳn sản phẩm bất chấp số lượng
  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
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
