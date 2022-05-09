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
};

const initialState:RecipeData[] = [];

export const getData = createAsyncThunk(
  'recipe/getData',
  async (_: void, thunkAPI) => {
    const getDoc = await getDocs(collection(db, "recipes"));
    const newState:RecipeData[] = [];
    getDoc.forEach((doc) => {
      const collection = doc.data();
      const result: RecipeData = {
        id: collection.id,
        createdAt: collection.createdAt,
        title: collection.title,
        contents: collection.contents,
      };
      console.log(result);
      newState.push(result);
    });
    return newState;
  }
)


const slice = createSlice({
  name:'recipe',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getData.fulfilled, (state, action) => {
      // Add user to the state array
      state = action.payload;
    })
  },
});

export const recipe = slice.reducer;