import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "../components/core/Firebase";
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
};

export type RecipeData = SubmitRecipe & {
  id: number;
  createdAt: number;
};

const initialState: RecipeData[] = [];

export const getData = createAsyncThunk("recipe/getData", async () => {
  const getDoc = await getDocs(collection(db, "recipes"));
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
    };
    newState.push(result);
  });
  return newState;
});

export type Test = {
  title: string;
  conText: string;
};

export const setData = createAsyncThunk<RecipeData[], SubmitRecipe>(
  "recipe/setData",
  async (recipeData, thunkApi) => {
    const recipe: RecipeData[] = (thunkApi.getState() as RootState).recipe;
    const docId = recipe.length > 0 ? recipe[0].id - 1 : 9999999999;
    const userDocumentRef = doc(db, "recipes", String(docId));
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
    };
    const newRecipe = [...recipe, result];
    await setDoc(userDocumentRef, result);
    return newRecipe;
  }
);

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
      });
  },
});

export const recipe = slice.reducer;
