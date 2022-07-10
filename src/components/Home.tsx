import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector, useSize } from "../hooks";
import { getPickUp, HomeRecipe, RecipeData } from "../slices/recipe";
import { RootState } from "../slices/store";
import Header from "./Header";
import Footer from "./Footer";
import RightContent from "./RightParts";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { serchString } from "../slices/screen/serchScreen";
import NewArrivalBox from "./homeParts/NewArraivalBox";
import SeasonBox from "./homeParts/SeasonBox";
import TagBox from "./homeParts/TagBox";
import PickUpBox from "./homeParts/PickUpBox";
import MainImageBox from "./homeParts/MainImageBox";
import { Config, getConfig } from "../slices/config";
export const Home = React.memo(() => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const recipe: HomeRecipe = useAppSelector(
    (state: RootState) => state.recipe
  );

  const config: Config = useAppSelector((state: RootState) => state.config);
  const { isMobileSize } = useSize();
  const [contents, setContents] = useState<RecipeData[]>([]);
  const [pickUp, setPickUp] = useState<RecipeData[]>([]);
  const [season, setSason] = useState<RecipeData[]>([]);

  useEffect(() => {
    dispatch(getConfig());
  }, []);

  useEffect(() => {
    if (recipe.newArrival.length === 0) {
      dispatch(getPickUp({ season: config.season, recipeUids: config.recipeUids }));
    };
  }, [config]);

  useEffect(() => {
    if (recipe.newArrival.length !== 0) {
      if (isMobileSize) {
        setContents(recipe.newArrival.slice(0, 3))
      } else {
        setContents(recipe.newArrival)
      };
      setPickUp(recipe.pickUp);
      setSason(recipe.seasons);
    }
  }, [recipe]);
  const [tag, setTag] = useState<string>('');
  const serch = (tagItem?: string) => {
    if (tagItem) {
      dispatch(serchString({ tag: tagItem }));
      navigation("/serch", { state: { title: tagItem } });
    } else {
      dispatch(serchString({ tag }));
      navigation("/serch", { state: { title: tag } });
    };
  };

  return (
    <Box sx={{ width: '100%', overflowX: "hidden" }}>
      <Header title={"Topページ"} />
      <Box sx={styles.container}>
        <MainImageBox mainImages={config.topImages} />
        <Box sx={styles.mainContainer}>
          <Box sx={styles.leftContainer}>
            <NewArrivalBox contents={contents} />
            <SeasonBox season={season} />
            <TagBox pickUpIngredients={config.pickUpIngredients} serch={serch} />
            <PickUpBox pickUp={pickUp} />
          </Box>
          <RightContent />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
});

export default Home;
const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
  },
  mainContainer: {
    display: "flex",
    flexDirection: { xs: 'column' as 'column', sm: 'row' as 'row' },
    alignItems: "space-between",
    justifyContent: "space-between",
  },
  leftContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    width: { xs: '100%', sm: "70%" },
  },
};
