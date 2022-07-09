import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { admin } from "./admin";
import { category } from "./category";
import { config } from "./config";
import { recipe } from "./recipe";
import { recommendation } from "./recommendation";
import { newArrivalScreen } from "./screen/newArrivalScreen";
import { serchScreen } from "./screen/serchScreen";

const reducer = combineReducers({
  category,
  recipe,
  newArrivalScreen,
  serchScreen,
  admin,
  recommendation,
  config,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
