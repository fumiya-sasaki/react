import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../components/core/Firebase";

export type Category = {
  category: string[];
  topCategory: string[];
};

const initialState: Category = {
  category: [],
  topCategory: [],
};

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async () => {
    const docRef = doc(db, "category", "selectCategory");
    const docSnap = await getDoc(docRef);
    const newCategory: Category = docSnap.exists()
      ? {
        category: docSnap.data().category,
        topCategory: docSnap.data().topCategory,
      }
      : { category: [], topCategory: [] };
    return newCategory;
  }
);

export const counterSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategory.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const category = counterSlice.reducer;
