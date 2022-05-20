import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import db from "../components/core/Firebase";
import { useAppSelector } from "../hooks";
import { RootState } from "./store";

export type Content = {
  imageUrls: string[];
  text: string;
  title: string;
};

export type RecipeData = {
  id: number;
  createdAt: number;
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
export type Test = {
  title: string;
  conText: string;
};
export const setData = createAsyncThunk<RecipeData[], Test>(
  "recipe/setData",
  async (recipeData, thunkApi) => {
    const recipe: RecipeData[] = (thunkApi.getState() as RootState).recipe;
    const docId = recipe.length > 0 ? recipe[0].id - 1 : 9999999999;
    const userDocumentRef = doc(db, "recipes", String(docId));
    const result: RecipeData = {
      conText: recipeData.conText,
      createdAt: 100,
      id: docId,
      mainImageUrl:
        "https://www.kikkoman.co.jp/homecook/search/recipe/img/00004975.jpg",
      title: recipeData.title,
      contents: [
        {
          imageUrls: [
            "https://recipe.r10s.jp/recipe-space/d/strg/ctrl/3/fe3479d2ab7dae055f26ef02291af5eadcf01cfb.86.2.3.2.jpg?interpolation=lanczos-none&fit=around%7C600:600&crop=600:600;*,*",
          ],
          text: "調理時間1時間",
          title: "調理",
        },
      ],
    };
    console.log(result);
    const newRecipe = [...recipe, result];
    await setDoc(userDocumentRef, result);
    return newRecipe;
  }
);

const slice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(setData.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const recipe = slice.reducer;
