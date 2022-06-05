import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { create } from "domain";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { RecipeData } from "../recipe";

const initialState: RecipeData[] = [];

export const getRecipeData = createAsyncThunk<
  RecipeData[],
  { recipe: RecipeData[]; pageNumber: number }
>("homeScreen/getRecipeData", async ({ recipe, pageNumber }) => {
  const indexNumber = (pageNumber - 1) * 10;

  const newState = recipe.slice(indexNumber, indexNumber + 10);

  return newState;
});

export const counterSlice = createSlice({
  name: "homeScreen",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRecipeData.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export const homeScreen = counterSlice.reducer;
