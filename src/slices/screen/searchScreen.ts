import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../components/core/firebase";
import { getRecipeDataResult, RecipeData } from "../recipe";

const initialState: RecipeData[] = [];

export const searchCategory = createAsyncThunk<RecipeData[], { category: string }>(
  "searchScreen/searchCategory",
  async ({ category }) => {
    const recipesRef = collection(db, "recipes");
    const getDoc = await getDocs(
      query(recipesRef, where("category", "==", category))
    );
    const newState: RecipeData[] = getRecipeDataResult(getDoc);
    return newState;
  });

export const searchString = createAsyncThunk<RecipeData[], { tag: string }>(
  "searchScreen/searchString",
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
  "searchScreen/getRecipeData",
  async ({ recipe, pageNumber }) => {
    const indexNumber = (pageNumber - 1) * 10;
    const newState = recipe.slice(indexNumber, indexNumber + 10);
    return newState;
  });

export const slice = createSlice({
  name: "searchScreen",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchCategory.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(searchString.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getRecipeData.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const searchScreen = slice.reducer;