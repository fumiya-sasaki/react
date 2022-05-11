import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import db from "../components/core/Firebase";

export type Content = {
  imageUrls: string[];
  text: string;
  title: string;
};

export type RecipeData = {
  id: number;
  createdAt: Timestamp;
  title: string;
  contents: Content[];
  conText: string;
  mainImageUrl: string;
};

const initialState: RecipeData[] = [];

export const getData = createAsyncThunk("recipe/getData", async () => {
  const getDoc = await getDocs(collection(db, "recipes"));
  const newState: RecipeData[] = [];
  getDoc.forEach((doc) => {
    const collection = doc.data();
    const result: RecipeData = {
      id: collection.id,
      createdAt: collection.createdAt,
      title: collection.title,
      contents: collection.contents,
      conText: collection.conText,
      mainImageUrl: collection.mainImageUrl,
    };
    newState.push(result);
  });
  return newState;
});

const slice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const recipe = slice.reducer;
