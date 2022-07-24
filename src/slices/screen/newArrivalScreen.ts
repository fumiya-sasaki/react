import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { db } from "../../components/core/firebase";
import { getRecipeDataResult, RecipeData } from "../recipe";
import { RootState } from "../store";

export type newArrivalScreenState = {
  recipeData: RecipeData[];
  lastData: boolean;
};

const initialState: newArrivalScreenState = {
  recipeData: [],
  lastData: false
};

export const nextGetDataScreen = createAsyncThunk<newArrivalScreenState, { endAt?: Date }>(
  "newArrivalScreen/nextGetDataScreen",
  async ({ endAt }, thunkApi) => {
    const getDoc = endAt
      ? await getDocs(query(collection(db, "recipes"), orderBy("createdAt", 'desc'), startAfter(endAt), limit(6)))
      : await getDocs(query(collection(db, "recipes"), limit(6)));
    const state: newArrivalScreenState = (thunkApi.getState() as RootState).newArrivalScreen;
    const newRecipeData: RecipeData[] = getRecipeDataResult(getDoc);
    const afterConcat: RecipeData[] = state.recipeData.concat(newRecipeData);
    const recipeData = afterConcat.filter((v, i, a) => a.findIndex((state) => state.uid === v.uid) === i);
    const lastData: boolean = newRecipeData.length === 6 ? false : true;
    const newState: newArrivalScreenState = { recipeData, lastData };
    return newState;
  });

export const slice = createSlice({
  name: "newArrivalScreen",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(nextGetDataScreen.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const newArrivalScreen = slice.reducer;
