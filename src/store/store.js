import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Reducer/auth";
import ArticleReducer from "../Reducer/ArticleReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    article: ArticleReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
