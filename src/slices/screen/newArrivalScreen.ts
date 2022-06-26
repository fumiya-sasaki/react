import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { db } from "../../components/core/Firebase";
import { RecipeData } from "../recipe";
import { RootState } from "../store";

const initialState: RecipeData[] = [];

export const nextGetDataScreen = createAsyncThunk<RecipeData[], { endAt?: Date }>(
  "recipe/nextGetDataScreen",
  async ({ endAt }, thunkApi) => {
    const getDoc = endAt
      ? await getDocs(query(collection(db, "recipes"), orderBy("createdAt", 'desc'), startAfter(endAt), limit(1)))
      : await getDocs(query(collection(db, "recipes"), limit(1)));
    const recipe: RecipeData[] = (thunkApi.getState() as RootState).newArrivalScreen;
    const newState: RecipeData[] = [...recipe];
    getDoc.forEach((doc) => {
      const collection = doc.data();
      const result: RecipeData = {
        id: collection.id,
        createdAt: collection.createdAt,
        title: collection.title,
        contents: collection.contents,
        introduction: collection.introduction,
        mainImageUrl: collection.mainImageUrl,
        category: collection.category,
        tags: collection.tags,
      };
      newState.push(result);
    });
    const afterFilterState = newState.filter((v, i, a) => {
      return a.findIndex((state) => state.id === v.id) === i;
    })
    return afterFilterState;
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
