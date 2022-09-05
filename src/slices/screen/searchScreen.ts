import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../components/core/firebase";
import { getRecipeDataResult, RecipeData } from "../recipe";
import { RootState } from "../store";

export type SearchScreenState = {
  recipeData: RecipeData[];
  isTopScroll: boolean;
}

const initialState: SearchScreenState = {
  recipeData: [],
  isTopScroll: false,
}

export const searchCategory = createAsyncThunk<SearchScreenState, { category: string }>(
  "searchScreen/searchCategory",
  async ({ category }, thunkApi) => {
    const screen: SearchScreenState = (thunkApi.getState() as RootState).searchScreen;
    const recipesRef = collection(db, "recipes");
    const getDoc = await getDocs(
      query(recipesRef, where("category", "==", category))
    );
    const newState: SearchScreenState = { ...screen, recipeData: getRecipeDataResult(getDoc) };
    return newState;
  });

export const searchString = createAsyncThunk<SearchScreenState, { tag: string }>(
  "searchScreen/searchString",
  async ({ tag }, thunkApi) => {
    const screen: SearchScreenState = (thunkApi.getState() as RootState).searchScreen;
    const recipesRef = collection(db, "recipes");
    const getDoc = await getDocs(
      query(recipesRef, where("tags", "array-contains", tag))
    );
    const newState: SearchScreenState = { ...screen, recipeData: getRecipeDataResult(getDoc) };
    return newState;
  }
);

export const getRecipeData = createAsyncThunk<SearchScreenState, { recipe: RecipeData[]; pageNumber: number }>(
  "searchScreen/getRecipeData",
  async ({ recipe, pageNumber }, thunkApi) => {
    const screen: SearchScreenState = (thunkApi.getState() as RootState).searchScreen;
    const indexNumber = (pageNumber - 1) * 10;
    const newState: SearchScreenState = { ...screen, recipeData: recipe.slice(indexNumber, indexNumber + 10) };
    return newState;
  });

export const slice = createSlice({
  name: "searchScreen",
  initialState,
  reducers: {
    setIsTopScroll: (state) => {
      state.isTopScroll = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchCategory.fulfilled, (state, action) => {
        state.isTopScroll = true;
        state.recipeData = action.payload.recipeData;
        return state;
      })
      .addCase(searchString.fulfilled, (state, action) => {
        state.isTopScroll = true;
        state.recipeData = action.payload.recipeData;
        return state;
      })
      .addCase(getRecipeData.fulfilled, (state, action) => {
        state.isTopScroll = true;
        state.recipeData = action.payload.recipeData;
        return state;
      });
  },
});

export const searchScreen = slice.reducer;
export const { setIsTopScroll } = slice.actions;