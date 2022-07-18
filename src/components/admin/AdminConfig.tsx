import { Box, Button, TextField, Typography, } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RecipeData } from "../../slices/recipe";
import { RootState } from "../../slices/store";
import { getPickUpData, nextGetDataScreen } from "../../slices/admin";
import { Config, getConfig, setConfig } from "../../slices/config";

export const AdminConfig = () => {
  const dispatch = useAppDispatch();
  const config: Config = useAppSelector(
    (state: RootState) => state.config
  );

  const [pickUpIngredients, setPickUpIngredients] = useState<string[]>([]);
  const [recipeUids, setRecipeUids] = useState<number[]>([]);
  const [pickUpData, setPickUpData] = useState<RecipeData[]>([]);
  const [season, setSeason] = useState<string>('');
  const [topImages, setTopImages] = useState<string[]>([]);


  useEffect(() => {
    dispatch(getConfig());
  }, []);

  const promiseGetPickUp = async (): Promise<RecipeData[]> => {
    const recipeUidsData = await getPickUpData(config.recipeUids);
    setPickUpData(recipeUidsData);
    return recipeUidsData;
  };

  useEffect(() => {
    if (pickUpData.length === 0) promiseGetPickUp();
    setPickUpIngredients(config.pickUpIngredients);
    setRecipeUids(config.recipeUids);
    setTopImages(config.topImages);
    setSeason(config.season);
  }, [config]);

  const addForm = () => {
    const newPickUpIngredients: string[] = [...pickUpIngredients];
    newPickUpIngredients.push('');
    console.log(newPickUpIngredients);
    setPickUpIngredients(newPickUpIngredients);
  };

  const deleteForm = (index: number) => {
    const newPickUpIngredients: string[] = [...pickUpIngredients];
    newPickUpIngredients.splice(index, 1);
    setPickUpIngredients(newPickUpIngredients);
  };

  const onChangeIngredients = (value: string, index: number) => {
    const newPickUpIngredients: string[] = [...pickUpIngredients];
    newPickUpIngredients[index] = value;
    setPickUpIngredients(newPickUpIngredients);
  };

  const onChangeMainImage = (e: any) => {
    if (e.target.files[0]) {
      const newImages = [...topImages];
      newImages.push(URL.createObjectURL(e.target.files[0]));
      console.log(newImages);
      setTopImages(newImages);
    }
  };

  const setConfigData = () => {
    dispatch(setConfig({ topImages, pickUpIngredients, recipeUids, season }))
  }

  return (
    <>
      <Button onClick={setConfigData}>変更</Button>
      <Box sx={styles.seasonBox}>
        {pickUpIngredients.map((ingredient, index) => (
          <Box key={index} sx={styles.seasonItem}>
            <TextField
              label='旬の食材'
              value={ingredient}
              variant='filled'
              fullWidth
              onChange={(e) => onChangeIngredients(e.target.value, index)}
            />
            <Button onClick={() => deleteForm(index)}>削除</Button>
          </Box>
        ))}
      </Box>
      <Button onClick={addForm}>追加</Button>

      <Box sx={styles.contentContainer}>
        {pickUpData.map((item, index) => (
          <Box key={index} style={styles.itemContainer}>
            <img src={item.mainImageUrl} alt="" style={styles.itemImage} />
            <Link to={"/admin/article"} state={{ recipeData: item }}>
              <Typography sx={styles.menuTitle}>{item.title}</Typography>
            </Link>
          </Box>
        ))}
      </Box>
      <TextField
        label='季節'
        value={season}
        variant="filled"
        fullWidth
        onChange={(e) => setSeason(e.target.value)}
        style={{ width: '20%', paddingBottom: 10 }}
      />
      <Box sx={styles.imgBox}>
        <Button variant="contained" component="label" >
          main画像をアップロード
          <input type="file" hidden onChange={(e) => onChangeMainImage(e)} />
        </Button>
        <Box sx={styles.imgItem}>
          {topImages.map((image, index) => (
            <img key={index} src={image} width={'200px'} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default AdminConfig;
const styles = {
  itemImage: {
    width: "100%",
    hight: "100%",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    // paddingTop: 30,
    width: "95%",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    width: "30%",
    // paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 5,
    flexWrap: "wrap",
  },
  menuTitle: {
    fontWeight: "bold",
    color: "dimgray",
    paddingTop: 2,
  },
  seasonBox: {
    display: "flex",
    flexDirection: "row" as "row",
    justifyContent: "flex-start",
    width: '100%',
    flexWrap: "wrap",
  },
  seasonItem: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "flex-start",
    width: '20%',
    paddingRight: 2,
  },
  imgBox: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "flex-start",
  },
  imgItem: {
    display: "flex",
    flexDirection: "row" as "row",
    justifyContent: "flex-start",
    width: '100%',
    flexWrap: "wrap",
    gap: 2,
  }
};
