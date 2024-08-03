import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.component";
import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.component";
import {CartDropdownContainer, EmptyMessage, CartItems} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigte = useNavigate();

  const goToCheckOutHandler = () => {
    navigte("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItems >
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage  >
        )}
      </CartItems>
      <Button onClick={goToCheckOutHandler}>CHECK OUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
