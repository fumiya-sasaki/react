import { deleteObject, getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../components/core/firebase";
import { RootState } from "./store";

export type Config = {
  recipeUids: number[];
  season: string;
  pickUpIngredients: string[];
  topImages: string[];
  pickUpWord: string;
};


const initialState: Config = {
  recipeUids: [],
  season: "",
  pickUpIngredients: [],
  topImages: [],
  pickUpWord: '',
};

export const getConfig = createAsyncThunk(
  "config/getConfig",
  async () => {
    const configData = doc(db, "config", "topData");
    const configDoc = await getDoc(configData);
    const newRecommendations: Config = configDoc.exists()
      ? {
        recipeUids: configDoc.data().recipeUids,
        season: configDoc.data().season,
        pickUpIngredients: configDoc.data().pickUpIngredients,
        topImages: configDoc.data().topImages,
        pickUpWord: configDoc.data().pickUpWord,
      }
      : { recipeUids: "", season: "", pickUpIngredients: [], topImages: [], pickUpWord: '' };
    return newRecommendations;
  });

export const setConfig = createAsyncThunk
  <Config, { topImages: string[], pickUpIngredients: string[], recipeUids: number[], season: string }>(
    "config/setConfig",
    async ({ topImages, pickUpIngredients, recipeUids, season }, thunkApi) => {
      const configDoc = doc(db, "config", "topData");
      const config: Config = (thunkApi.getState() as RootState).config;
      const deleteImages = config.topImages.filter((img) => !topImages.includes(img));
      for (let index = 0; index < topImages.length; index++) {
        if (topImages[index].indexOf("blob") !== -1) {
          const imageNumber: number = Date.now();
          const storageRef = ref(storage, "config/topImg/" + 'imgNumber' + imageNumber);
          const fetchContentImage = await fetch(topImages[index]);
          const contentImageBlob = await fetchContentImage.blob();
          await uploadBytes(storageRef, contentImageBlob);
          await getDownloadURL(ref(storage, "config/topImg/" + 'imgNumber' + imageNumber))
            .then((url) => {
              if (url.indexOf("blob") === -1) topImages[index] = url;
            });
        }
      };
      for (let index = 0; index < deleteImages.length; index++) {
        const storageNumber: string =
          deleteImages[index].slice(deleteImages[index].indexOf('imgNumber') + 9,
            deleteImages[index].indexOf('?alt='));
        const storageRef = ref(storage, "config/topImg/" + 'imgNumber' + storageNumber);
        await deleteObject(storageRef).then(() => console.log('OK!'));
      };
      const newConfig: Config = { ...config, topImages, pickUpIngredients, recipeUids, season };
      await setDoc(configDoc, newConfig);
      return newConfig;
    });

export const setRecipeUids = createAsyncThunk<Config, { recipeUid: number }>(
  "config/setRecipeUids",
  async ({ recipeUid }, thunkApi) => {
    const configDoc = doc(db, "config", "topData");
    const config: Config = (thunkApi.getState() as RootState).config;
    const recipeUids = !config.recipeUids.includes(recipeUid)
      ? [...config.recipeUids, recipeUid]
      : [...config.recipeUids].filter(uid => uid !== recipeUid);
    const newConfig = { ...config, recipeUids };
    await updateDoc(configDoc, { recipeUids });
    return newConfig;
  });

export const changePickUpWord = createAsyncThunk<Config, { pickUpWord: string }>(
  "config/changePickUpWord",
  async ({ pickUpWord }, thunkApi) => {
    const configDoc = doc(db, "config", "topData");
    const config: Config = (thunkApi.getState() as RootState).config;

    const newConfig = { ...config, pickUpWord };
    await updateDoc(configDoc, { pickUpWord });
    return newConfig;
  });

const slice = createSlice({
  name: "config",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConfig.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(setConfig.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(setRecipeUids.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(changePickUpWord.fulfilled, (state, action) => {
        return action.payload;
      })
  },
});

export const config = slice.reducer;
