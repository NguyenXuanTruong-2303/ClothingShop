import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const CATEGORIES_STATE_INITIAL = {
  categories: [],
};

export const categoriesReducer = (state = CATEGORIES_STATE_INITIAL, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
      return { ...state, categories: payload };
    default:
      return state;
  }
};
