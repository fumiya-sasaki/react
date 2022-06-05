import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../components/core/Firebase";
import { Category } from "./category";
import { RootState } from "./store";

export type Content = {
  imageUrls: string[];
  text: string;
  title: string;
};

export type SubmitRecipe = {
  title: string;
  contents: Content[];
  introduction: string;
  mainImageUrl: string;
  category: string;
  tags: string[];
};

export type RecipeData = SubmitRecipe & {
  id: number;
  createdAt: number;
};

const initialState: RecipeData[] = [];

export const getData = createAsyncThunk("recipe/getData", async () => {
  const getDoc = await getDocs(query(collection(db, "recipes"), limit(10)));
  const newState: RecipeData[] = [];
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
  return newState;
});

export const serchCategory = createAsyncThunk<
  RecipeData[],
  { category: string }
>("recipe/serchCategory", async ({ category }) => {
  const recipesRef = collection(db, "recipes");
  const getDoc = await getDocs(
    query(recipesRef, where("category", "==", category))
  );

  const newState: RecipeData[] = [];
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
  return newState;
});

export const serchString = createAsyncThunk<RecipeData[], { tag: string }>(
  "recipe/serchString",
  async ({ tag }) => {
    const recipesRef = collection(db, "recipes");
    const getDoc = await getDocs(
      query(recipesRef, where("tags", "array-contains", tag))
    );
    const newState: RecipeData[] = [];
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
    return newState;
  }
);

export const setData = createAsyncThunk<RecipeData[], SubmitRecipe>(
  "recipe/setData",
  async (recipeData, thunkApi) => {
    const recipe: RecipeData[] = (thunkApi.getState() as RootState).recipe;
    const category: string[] = (thunkApi.getState() as RootState).category
      .category;
    const docId = recipe.length > 0 ? recipe[0].id - 1 : 9999999999;
    const recipeDocumentRef = doc(db, "recipes", String(docId));
    const categoryDocumentRef = doc(db, "category", "selectCategory");
    let mainImageUrl = "";

    if (recipeData.mainImageUrl.indexOf("blob") !== -1) {
      const storageRef = ref(storage, "img/" + docId + "/mainImage");
      const fetchMainImage = await fetch(recipeData.mainImageUrl);
      const mainImageBlob = await fetchMainImage.blob();
      await uploadBytes(storageRef, mainImageBlob);
      await getDownloadURL(ref(storage, "img/" + docId + "/mainImage")).then(
        (url) => {
          mainImageUrl = url;
        }
      );
    } else {
      mainImageUrl = recipeData.mainImageUrl;
    }

    for (let index = 0; index < recipeData.contents.length; index++) {
      for (
        let imgIndex = 0;
        imgIndex < recipeData.contents[index].imageUrls.length;
        imgIndex++
      ) {
        if (
          recipeData.contents[index].imageUrls[imgIndex].indexOf("blob") !== -1
        ) {
          const storageRef = ref(
            storage,
            "img/" + docId + "/contentImage/" + index + "/" + imgIndex
          );
          const fetchContentImage = await fetch(
            recipeData.contents[index].imageUrls[imgIndex]
          );
          const contentImageBlob = await fetchContentImage.blob();
          await uploadBytes(storageRef, contentImageBlob);
          await getDownloadURL(
            ref(
              storage,
              "img/" + docId + "/contentImage/" + index + "/" + imgIndex
            )
          ).then((url) => {
            if (url.indexOf("blob") === -1) {
              recipeData.contents[index].imageUrls[imgIndex] = url;
            }
          });
        }
      }
    }

    const result: RecipeData = {
      introduction: recipeData.introduction,
      createdAt: 100,
      id: docId,
      mainImageUrl,
      title: recipeData.title,
      contents: recipeData.contents,
      category: recipeData.category,
      tags: recipeData.tags,
    };
    const newRecipe = [...recipe, result];
    const newCategory = Array.from(new Set([...category, recipeData.category]));
    await Promise.all([
      setDoc(recipeDocumentRef, result),
      setDoc(categoryDocumentRef, { category: newCategory }),
    ]);
    return newRecipe;
  }
);

export const kwSerchRecipe = createAsyncThunk<
  RecipeData[],
  { category: string }
>("recipe/kwSerchRecipe", async ({ category }) => {
  const recipesRef = collection(db, "recipes");
  const getDoc = await getDocs(
    query(recipesRef, where("category", "==", category))
  );

  const newState: RecipeData[] = [];
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
  return newState;
});

const slice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(setData.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(serchCategory.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(serchString.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const recipe = slice.reducer;
