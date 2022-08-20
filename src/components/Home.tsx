import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, useSize } from "../hooks";
import { getHomeRecipes, HomeRecipe, RecipeData } from "../slices/recipe";
import { RootState } from "../slices/store";
import Header from "./Header";
import Footer from "./Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NewArrivalBox from "./homeParts/NewArraivalBox";
import MainImageBox from "./homeParts/MainImageBox";
import PickUpWordBox from "./homeParts/PickUpWordBox";
import { Config, getConfig } from "../slices/config";


export const Home = React.memo(() => {
  const dispatch = useAppDispatch();
  const recipe: HomeRecipe = useAppSelector((state: RootState) => state.recipe);
  const config: Config = useAppSelector((state: RootState) => state.config);
  const { isMobileSize } = useSize();
  const [newArrival, setNewArrival] = useState<RecipeData[]>([]);
  const [pickUpWords, setPickUpWords] = useState<RecipeData[]>([]);

  useEffect(() => {
    dispatch(getConfig());
  }, []);

  useEffect(() => {
    dispatch(getHomeRecipes({ pickUpWord: config.pickUpWord }));
  }, [config]);

  useEffect(() => {
    setNewArrival(isMobileSize ? recipe.newArrival.slice(0, 3) : recipe.newArrival)
    setPickUpWords(recipe.pickUpWords.slice(0, 10));
  }, [recipe]);

  return (
    <>
      <Header title={"Home"} />
      <Box sx={styles.container}>
        <MainImageBox mainImages={config.topImages} />
        <Box sx={styles.mainContainer}>
          <NewArrivalBox contents={newArrival} />
          <PickUpWordBox
            pickUpWords={pickUpWords}
            pickUpWord={config.pickUpWord}
          />
        </Box>
      </Box>
      <Footer />
    </>
  );
});

export default Home;
const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
  },
  mainContainer: {
    display: "flex",
    flexDirection: 'column' as 'column',
    alignItems: "center",
    justifyContent: "space-between",
    width: { xs: '100%', md: '1000px' },
  },
};
