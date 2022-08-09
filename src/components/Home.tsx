import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector, useSize } from "../hooks";
import { getHomeRecipes, HomeRecipe, RecipeData } from "../slices/recipe";
import { RootState } from "../slices/store";
import Header from "./Header";
import Footer from "./Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NewArrivalBox from "./homeParts/NewArraivalBox";
import SeasonBox from "./homeParts/SeasonBox";
import TagBox from "./homeParts/TagBox";
import PickUpBox from "./homeParts/PickUpBox";
import MainImageBox from "./homeParts/MainImageBox";
import { Config, getConfig } from "../slices/config";

export const Home = React.memo(() => {
  const dispatch = useAppDispatch();
  const recipe: HomeRecipe = useAppSelector((state: RootState) => state.recipe);
  const config: Config = useAppSelector((state: RootState) => state.config);
  const { isMobileSize } = useSize();
  const [contents, setContents] = useState<RecipeData[]>([]);
  const [season, setSason] = useState<RecipeData[]>([]);

  useEffect(() => {
    if (config.topImages.length === 0) dispatch(getConfig());
  }, []);

  useEffect(() => {
    if (recipe.newArrival.length === 0) {
      dispatch(getHomeRecipes({ season: config.season, recipeUids: config.recipeUids }));
    };
  }, [config]);

  useEffect(() => {
    if (recipe.newArrival.length !== 0) {
      setContents(isMobileSize ? recipe.newArrival.slice(0, 3) : recipe.newArrival)
      setSason(recipe.seasons);
    }
  }, [recipe]);

  return (
    <>
      <Header title={"Home"} />
      <Box sx={styles.container}>
        <MainImageBox mainImages={config.topImages} />
        <Box sx={styles.mainContainer}>
          <NewArrivalBox contents={contents} />
          <SeasonBox season={season} />
          {/* <TagBox pickUpIngredients={config.pickUpIngredients} serch={serch} /> */}
          {/* <PickUpBox pickUp={pickUp} /> */}
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
