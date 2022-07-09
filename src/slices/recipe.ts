import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection, doc, getDoc, getDocs, limit, query, setDoc, where,
} from "firebase/firestore";
import { db, storage } from "../components/core/Firebase";
import { RootState } from "./store";

export type Content = {
  imageUrls: string[];
  text: string;
  title: string;
};

export type SubmitRecipe = {
  uid: number;
  title: string;
  contents: Content[];
  introduction: string;
  mainImageUrl: string;
  category: string;
  tags: string[];
  season: string;
};

export type RecipeData = SubmitRecipe & {
  createdAt: Date;
  newArticle?: boolean;
};

export type HomeRecipe = {
  newArrival: RecipeData[],
  seasons: RecipeData[],
  pickUp: RecipeData[],
};

export const initialData = {
  uid: 0,
  createdAt: 0,
  title: "",
  contents: { imageUrls: [], text: "", title: "" },
  introduction: "",
  mainImageUrl: "",
  category: "",
  tags: [],
  newArticle: true,
  season: "",
};

const initialState: HomeRecipe = {
  newArrival: [],
  seasons: [],
  pickUp: [],
};

export const getData = createAsyncThunk<HomeRecipe>(
  "recipe/getData",
  async (_, thunkApi) => {
    const getDoc = await getDocs(query(collection(db, "recipes"), limit(6)));
    const recipe: HomeRecipe = (thunkApi.getState() as RootState).recipe;
    const newArrival: RecipeData[] = [];
    getDoc.forEach((doc) => {
      const collection = doc.data();
      const result: RecipeData = {
        uid: collection.uid,
        createdAt: collection.createdAt,
        title: collection.title,
        contents: collection.contents,
        introduction: collection.introduction,
        mainImageUrl: collection.mainImageUrl,
        category: collection.category,
        tags: collection.tags,
        season: collection.season,
      };
      newArrival.push(result);
    });
    const newState = { ...recipe, newArrival };
    return newState;
  });

export const getPickUp = createAsyncThunk<HomeRecipe, { season: string, recipeUids: number[] }>(
  "recipe/getPickUp",
  async ({ season, recipeUids }, thunkApi) => {
    const recipesRef = collection(db, "recipes");
    const docSeason = await getDocs(
      query(recipesRef, where("season", "==", season))
    );

    const docPickUp = await getDocs(
      query(recipesRef, where("uid", "in", recipeUids))
    );

    const getDoc = await getDocs(query(collection(db, "recipes"), limit(6)));


    const newArrival: RecipeData[] = [];
    getDoc.forEach((doc) => {
      const collection = doc.data();
      const result: RecipeData = {
        uid: collection.uid,
        createdAt: collection.createdAt,
        title: collection.title,
        contents: collection.contents,
        introduction: collection.introduction,
        mainImageUrl: collection.mainImageUrl,
        category: collection.category,
        tags: collection.tags,
        season: collection.season,
      };
      newArrival.push(result);
    });

    const seasons: RecipeData[] = [];
    const pickUp: RecipeData[] = [];
    docSeason.forEach((doc) => {
      const collection = doc.data();
      const result: RecipeData = {
        uid: collection.uid,
        createdAt: collection.createdAt,
        title: collection.title,
        contents: collection.contents,
        introduction: collection.introduction,
        mainImageUrl: collection.mainImageUrl,
        category: collection.category,
        tags: collection.tags,
        season: collection.season,
      };
      seasons.push(result);
    });

    docPickUp.forEach((doc) => {
      const collection = doc.data();
      const result: RecipeData = {
        uid: collection.uid,
        createdAt: collection.createdAt,
        title: collection.title,
        contents: collection.contents,
        introduction: collection.introduction,
        mainImageUrl: collection.mainImageUrl,
        category: collection.category,
        tags: collection.tags,
        season: collection.season,
      };
      pickUp.push(result);
    });

    const newState: HomeRecipe = { newArrival, seasons, pickUp }
    console.log("getRecipeData");
    return newState;
  });

export const getConnectionRecipe = async (tags: string[]): Promise<RecipeData[]> => {
  try {
    console.log(tags)
    const recipesRef = collection(db, "recipes");
    const docPickUp = await getDocs(
      query(recipesRef, where("tags", "array-contains-any", tags))
    );
    const pickUp: RecipeData[] = [];
    docPickUp.forEach((doc) => {
      const collection = doc.data();
      const result: RecipeData = {
        uid: collection.uid,
        createdAt: collection.createdAt,
        title: collection.title,
        contents: collection.contents,
        introduction: collection.introduction,
        mainImageUrl: collection.mainImageUrl,
        category: collection.category,
        tags: collection.tags,
        season: collection.season,
      };
      pickUp.push(result);
    });
    console.log(pickUp)
    return pickUp;
  } catch {
    console.log("error")
    const pickUp: RecipeData[] = [];
    return pickUp;
  }
}
const slice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getPickUp.fulfilled, (state, action) => {
        return action.payload;
      })
  },
});

export const recipe = slice.reducer;
