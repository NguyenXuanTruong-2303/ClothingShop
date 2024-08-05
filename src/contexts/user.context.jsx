import { createContext, useEffect, useReducer } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

//==================================== UseContext===================
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//================================== useReducers==================================

const INITITAL_STATE = { currentUser: null };

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandler type ${type} in useReducer`);
  }
};

//================================= Provider=====================

export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null); // phục vụ reducer nếu ko dùng thì gỡ ra để kết hợp vỡi context

  // phuc vu reducer
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITITAL_STATE);
  console.log(currentUser);

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unSubscribe;
  }, []);

  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
