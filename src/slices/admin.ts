import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDocs, limit, orderBy, query, setDoc, startAfter, where } from "firebase/firestore";
import { db, storage } from "../components/core/firebase";
import { Category } from "./category";
import { getRecipeDataResult, RecipeData, SubmitRecipe } from "./recipe";
import { RootState } from "./store";

const initialState: RecipeData[] = [];

export const nextGetDataScreen = createAsyncThunk<RecipeData[], { endAt?: Date }>(
  "admin/nextGetDataScreen",
  async ({ endAt }, thunkApi) => {
    const getDoc = endAt
      ? await getDocs(query(collection(db, "recipes"), orderBy("createdAt", 'desc'), startAfter(endAt), limit(3)))
      : await getDocs(query(collection(db, "recipes"), limit(3)));
    const recipe: RecipeData[] = (thunkApi.getState() as RootState).admin;
    const newState: RecipeData[] = recipe.concat(getRecipeDataResult(getDoc));
    const afterFilterState = newState.filter((v, i, a) => a.findIndex((state) => state.uid === v.uid) === i);
    return afterFilterState;
  });

export const setData = createAsyncThunk<RecipeData[], SubmitRecipe>(
  "admin/setData",
  async (recipeData, thunkApi) => {
    const recipe: RecipeData[] = (thunkApi.getState() as RootState).admin;
    const category: Category = (thunkApi.getState() as RootState).category;
    const docId = recipeData.uid !== 0 ? recipeData.uid : recipe.length > 0 ? recipe[0].uid - 1 : 9999999999;
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
        });
    } else {
      mainImageUrl = recipeData.mainImageUrl;
    }

    for (let index = 0; index < recipeData.contents.length; index++) {
      for (
        let imgIndex = 0;
        imgIndex < recipeData.contents[index].imageUrls.length;
        imgIndex++
      ) {
        if (recipeData.contents[index].imageUrls[imgIndex].indexOf("blob") !== -1) {
          const imageNumber: number = Date.now();
          const storageRef = ref(storage, "img/" + docId + "/contentImage/" + index + "/" + imageNumber);
          const fetchContentImage = await fetch(recipeData.contents[index].imageUrls[imgIndex]);
          const contentImageBlob = await fetchContentImage.blob();
          await uploadBytes(storageRef, contentImageBlob);
          await getDownloadURL(ref(storage, "img/" + docId + "/contentImage/" + index + "/" + imageNumber))
            .then((url) => {
              if (url.indexOf("blob") === -1) {
                recipeData.contents[index].imageUrls[imgIndex] = url;
              }
            });
        }
      }
    }

    const result: RecipeData = {
      introduction: recipeData.introduction,
      createdAt: new Date(),
      uid: docId,
      mainImageUrl,
      title: recipeData.title,
      contents: recipeData.contents,
      category: recipeData.category,
      tags: recipeData.tags,
      season: recipeData.season,
    };
    const newRecipe = [result, ...recipe];
    const newCategory = { ...category, category: Array.from(new Set([...category.category, recipeData.category])) };
    await Promise.all([
      setDoc(recipeDocumentRef, result),
      setDoc(categoryDocumentRef, newCategory),
    ]);

    return newRecipe;
  }
);

export const getPickUpData = async (uids: number[]): Promise<RecipeData[]> => {
  try {

    const recipesRef = collection(db, "recipes");
    const docPickUp = await getDocs(query(recipesRef, where("uid", "in", uids)));
    const newPickUp: RecipeData[] = [];
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
      newPickUp.push(result);
    });
    return newPickUp;
  } catch {
    const pickUp: RecipeData[] = [];
    return pickUp;
  }
};

export const slice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(nextGetDataScreen.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(setData.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const admin = slice.reducer;
