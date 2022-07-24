import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../components/core/Firebase";
import { getRecipeDataResult, RecipeData } from "../recipe";

const initialState: RecipeData[] = [];

export const serchCategory = createAsyncThunk<RecipeData[], { category: string }>(
  "serchScreen/serchCategory",
  async ({ category }) => {
    const recipesRef = collection(db, "recipes");
    const getDoc = await getDocs(
      query(recipesRef, where("category", "==", category))
    );
    const newState: RecipeData[] = getRecipeDataResult(getDoc);
    return newState;
  });

export const serchString = createAsyncThunk<RecipeData[], { tag: string }>(
  "serchScreen/serchString",
  async ({ tag }) => {
    const recipesRef = collection(db, "recipes");
    const getDoc = await getDocs(
      query(recipesRef, where("tags", "array-contains", tag))
    );
    const newState: RecipeData[] = getRecipeDataResult(getDoc);
    return newState;
  }
);

export const getRecipeData = createAsyncThunk<RecipeData[], { recipe: RecipeData[]; pageNumber: number }>(
  "serchScreen/getRecipeData",
  async ({ recipe, pageNumber }) => {
    const indexNumber = (pageNumber - 1) * 10;
    const newState = recipe.slice(indexNumber, indexNumber + 10);
    return newState;
  });

export const slice = createSlice({
  name: "serchScreen",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(serchCategory.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(serchString.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getRecipeData.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const serchScreen = slice.reducer;