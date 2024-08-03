import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";

// Chuyen scss thanh file jsx
import { NavigationContainer, LogoContainer, NavLink, NavLinks } from "./navigation.styles";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.component";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../component/cart-icon/cart-icon.component";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  // const signOutHandler = async () => {
  //   const res = await signOutUser();
  //   setCurrentUser(null);
  // };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer  to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks className="nav-links-container">
          <NavLink className="nav-link" to="/shop">
            SHOP
          </NavLink>
          {currentUser ? (
            <NavLink as='span'  onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink  to="/auth">
              SIGN IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

// return (
//   <Fragment>
//     <NavigationContainer >
//       <Link className="logo-container" to="/">
//         <CrwnLogo className="logo" />
//       </Link>
//       <div className="nav-links-container">
//         <Link className="nav-link" to="/shop">
//           SHOP
//         </Link>
//         {currentUser ? (
//           <span className="nav-link" onClick={signOutUser}>
//             SIGN OUT
//           </span>
//         ) : (
//           <Link className="nav-link" to="/auth">
//             SIGN IN
//           </Link>
//         )}
//         <CartIcon />
//       </div>
//       {isCartOpen && <CartDropdown />}
//     </NavigationContainer>
//     <Outlet />
//   </Fragment>
// );
// };

export default Navigation;
