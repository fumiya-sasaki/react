import { Box, Button, Icon, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getData, getPickUp, HomeRecipe, RecipeData } from "../slices/recipe";
import { RootState } from "../slices/store";
import Header from "./Header";
import Footer from "./Footer";
import { ArrowCircleLeftTwoTone, ArrowCircleRightTwoTone, DoubleArrow, EmojiFlags, Restaurant } from "@mui/icons-material";
import RightContent from "./RightParts";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Category } from "../slices/category";
import { serchString } from "../slices/screen/serchScreen";
import { getRecommendation, Recommendation } from "../slices/recommendation";
import NewArrivalBox from "./homeParts/NewArraivalBox";
import SeasonBox from "./homeParts/SeasonBox";
import TagBox from "./homeParts/TagBox";
import PickUpBox from "./homeParts/PickUpBox";
import MainImageBox from "./homeParts/MainImageBox";
export const Home = React.memo(() => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const recipe: HomeRecipe = useAppSelector(
    (state: RootState) => state.recipe
  );

  const recommendation: Recommendation = useAppSelector(
    (state: RootState) => state.recommendation
  );

  const [contents, setContents] = useState<RecipeData[]>([]);
  const [pickUp, setPickUp] = useState<RecipeData[]>([]);
  const [season, setSason] = useState<RecipeData[]>([]);

  useEffect(() => {
    dispatch(getRecommendation());
  }, []);

  useEffect(() => {
    if (recipe.newArrival.length === 0) {
      dispatch(getPickUp({ season: recommendation.season, recipeUids: recommendation.recipeUids }));
    };
  }, [recommendation]);

  useEffect(() => {
    if (recipe.newArrival.length !== 0) {
      setContents(recipe.newArrival);
      setPickUp(recipe.pickUp);
      setSason(recipe.seasons);
    }
  }, [recipe]);
  const [tag, setTag] = useState<string>("");
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
    <>
      <Header title={"Topページ"} />
      <Box sx={styles.container}>
        <MainImageBox />
        <Box sx={styles.mainContainer}>
          <Box sx={styles.leftContainer}>
            <NewArrivalBox contents={contents} />
            <SeasonBox season={season} />
            <TagBox pickUpIngredients={recommendation.pickUpIngredients} serch={serch} />
            <PickUpBox pickUp={pickUp} />
          </Box>
          <Box sx={styles.rightContainer}>
            <RightContent />
          </Box>
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
  },
  mainContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "space-between",
    justifyContent: "space-between",
  },
  carousel: {
    paddingTop: 2,
  },
  mainImageBox: {
    paddingLeft: 1,
    paddingRight: 1,
  },
  leftContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
  },
  newContentBox: {
    width: "80%",
    marginTop: 5,
  },
  tagContentBox: {
    width: "40%",
    marginTop: 5,
  },
  titleBox: {
    padding: 1,
    bgcolor: "#fdeff2",
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "center",
  },
  imageBox: {
    display: "flex",
    flexDirection: "column" as "column",
    width: "90%",
    paddingTop: 7,
    // paddingBottom: 5,
  },
  imageItemF: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "25%",
    hight: "20%",
  },
  itemImage: {
    width: "100%",
    hight: "100%",
  },
  itemImagePick: {
    width: "30%",
    hight: "30%",
    paddingBottom: "20px",
    paddingTop: "20px",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    width: "23%",
    // paddingLeft: 1,
    // paddingRight: 1,
  },
  itemContainerSason: {
    display: "flex",
    flexDirection: "column" as "column",
    width: "100%",
    paddingLeft: 3,
    paddingRight: 3,
  },
  itemContainerPick: {
    display: "flex",
    flexDirection: "row" as "row",
    width: "90%",
    // borderBottom: '1px solid silver',
    marginBottom: 5,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    width: "100%",
    flexWrap: "wrap",
    // paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentContainerSeason: {
    display: "flex",
    flexDirection: "row" as "row",
    width: "100%",
    paddingTop: 3,
    paddingBottom: 5,
    justifyContent: "space-between",
  },
  titleAndIntr: {
    display: "flex",
    flexDirection: "column" as "column",
    width: "100%",
    flexWrap: "wrap",
    // paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 5,
    justifyContent: "flex-start",
  },
  tagContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    width: "80%",
    justifyContent: "flex-start",
  },
  menuTitleSason: {
    fontWeight: "bold",
    color: "dimgray",
    paddingTop: 1,
    marginBottom: 3,
  },
  menuBox: {
    display: "flex",
    flexDirection: "column" as "column",
    paddingLeft: 5,
  },
  menuTitle: {
    fontWeight: "bold",
    color: "dimgray",
    paddingTop: 1,
  },
  menuTitlePick: {
    fontWeight: "bold",
    color: "dimgray",
    fontSize: "20px",
    paddingLeft: "25px",
  },
  introduction: {
    fontWeight: "lighter",
    color: "dimgray",
    fontSize: "16px",
    paddingLeft: "25px",
    paddingTop: "15px",
  },
  rightContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "30%",
    marginRight: 5,
  },
  serchForm: {
    width: "60%",
    paddingTop: 1,
  },
  tagBox: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingBottom: 1,
  },
  tagItem: {
    margin: 1,
  },
  arrowStyles: {
    position: 'absolute',
    width: 40,
    height: 40,
    zIndex: 2,
    top: 'calc(50% - 15px)'
  }
};
