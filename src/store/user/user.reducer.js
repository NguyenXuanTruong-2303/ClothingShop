import { USER_ACTION_TYPES } from "./user.types";

const INITITAL_STATE = { currentUser: null };

export const userReducer = (state = INITITAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return { ...state, currentUser: payload };
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return { ...state, currentUser: null };
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
      return { ...state, error: payload };
    default:
      return state;
  }
};

// MẤY CÁI CASE NÀY CHỈ GỌI KHI CẦN CẬP NHẬT STATE THÔI CHỨ MẤY CÁI GET HAY GÌ ĐÓ KO LIÊN QUAN THÌ KO CÓ Ở ĐÂY
