import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { category } from "./category";
import { recipe } from "./recipe";
import { homeScreen } from "./screen/homeScreen";

const reducer = combineReducers({
  category,
  recipe,
  homeScreen,
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
