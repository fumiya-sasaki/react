import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, DocumentData, getDocs, limit, query, QuerySnapshot, where, } from "firebase/firestore";
import { db } from "../components/core/firebase";

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


export const getRecipeDataResult = (docs: QuerySnapshot<DocumentData>) => {
  const recipeDates: RecipeData[] = [];
  docs.forEach((doc) => {
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
    recipeDates.push(result);
  });
  return recipeDates;
};

export const getHomeRecipes = createAsyncThunk<HomeRecipe, { season: string, recipeUids: number[] }>(
  "recipe/getHomeRecipes",
  async ({ season, recipeUids }, thunkApi) => {
    const recipesRef = collection(db, "recipes");
    const [docSeason, docPickUp, getDoc] = await Promise.all([
      getDocs(query(recipesRef, where("season", "==", season))),
      getDocs(query(recipesRef, where("uid", "in", recipeUids))),
      getDocs(query(collection(db, "recipes"), limit(6)))
    ]);
    const newArrival: RecipeData[] = getRecipeDataResult(getDoc);
    const seasons: RecipeData[] = getRecipeDataResult(docSeason);
    const pickUp: RecipeData[] = getRecipeDataResult(docPickUp);
    const newState: HomeRecipe = { newArrival, seasons, pickUp }
    return newState;
  });

export const getConnectionRecipe = async (tags: string[]): Promise<RecipeData[]> => {
  try {
    const recipesRef = collection(db, "recipes");
    const docPickUp = await getDocs(query(recipesRef, where("tags", "array-contains-any", tags)));
    const pickUp: RecipeData[] = getRecipeDataResult(docPickUp);
    return pickUp;
  } catch {
    console.log("error");
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
      .addCase(getHomeRecipes.fulfilled, (state, action) => {
        return action.payload;
      })
  },
});

export const recipe = slice.reducer;
