import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection, doc, getDoc, getDocs, limit, query, setDoc,
} from "firebase/firestore";
import { ArrayDestructuringAssignment } from "typescript";
import { db, storage } from "../components/core/Firebase";
import { RootState } from "./store";

export type Recommendation = {
  recipeUids: number[];
  season: string;
  pickUpIngredients: string[];
};


const initialState: Recommendation = {
  recipeUids: [],
  season: "",
  pickUpIngredients: [],
};

export const getRecommendation = createAsyncThunk(
  "recommendation/getRecommendation",
  async () => {
    const docRef = doc(db, "recommendation", "recommendations");
    const docSnap = await getDoc(docRef);
    const newRecommendations: Recommendation = docSnap.exists()
      ? {
        recipeUids: docSnap.data().recipeUids,
        season: docSnap.data().season,
        pickUpIngredients: docSnap.data().pickUpIngredients
      }
      : { recipeUids: "", season: "", pickUpIngredients: [] };
    return newRecommendations;
  });


const slice = createSlice({
  name: "recommendation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecommendation.fulfilled, (state, action) => {
        return action.payload;
      })
  },
});

export const recommendation = slice.reducer;
