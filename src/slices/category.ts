import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../components/core/Firebase";

export type Category = {
  category: string[];
};

const initialState: Category = {
  category: [],
};

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async () => {
    const docRef = doc(db, "category", "selectCategory");
    const docSnap = await getDoc(docRef);
    const newCategory: Category = docSnap.exists()
      ? { category: docSnap.data().category }
      : { category: [] };
    return newCategory;
  }
);

export const counterSlice = createSlice({
  name: "category",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategory.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export const category = counterSlice.reducer;
