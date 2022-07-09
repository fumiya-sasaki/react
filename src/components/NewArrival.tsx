import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RecipeData } from "../slices/recipe";
import { RootState } from "../slices/store";
import Header from "./Header";
import Footer from "./Footer";
import { nextGetDataScreen } from "../slices/screen/newArrivalScreen";
import { DoubleArrow, Restaurant } from "@mui/icons-material";
import RightContent from "./RightParts";
import restaurant from "../images/restaurant.png";

export const NewArrival = React.memo(() => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const screen: RecipeData[] = useAppSelector(
    (state: RootState) => state.newArrivalScreen
  );

  const [contents, setContents] = useState<RecipeData[]>([]);

  useEffect(() => {
    if (screen.length === 0) {
      dispatch(nextGetDataScreen({}));
    };
  }, []);

  useEffect(() => {
    setContents(screen)
  }, [screen]);

  const getNext = () => {
    dispatch(nextGetDataScreen({ endAt: screen[screen.length - 1].createdAt }));
  };

  return (
    <>
      <Header title={"新着レシピ"} />
      <Box sx={styles.container}>
        <Box sx={styles.leftContainer}>
          <Box sx={styles.titleBox}>
            <img src={restaurant} alt="" width={"50px"} />
            <Typography sx={styles.font}>新着レシピ</Typography>
          </Box>
          <Box sx={styles.contentContainer}>
            {contents.map((item) => (
              <Box key={item.uid} style={styles.itemContainer}>
                <img src={item.mainImageUrl} alt="" style={styles.itemImage} />
                <Link to={"/content/"} state={{ recipeData: item }}>
                  <Typography sx={styles.menuTitle}>{item.title}</Typography>
                </Link>
              </Box>
            ))}
          </Box>
          <Button style={{ width: "80%" }} onClick={getNext}>もっと見る<DoubleArrow /></Button>
        </Box>
        <RightContent />
      </Box>
      <Footer />
    </>
  );
});

export default NewArrival;
const styles = {
  container: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "space-between",
    justifyContent: "space-between",
  },
  leftContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
  },
  titleBox: {
    padding: 1,
    bgcolor: "#fdeff2",
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "center",
    width: "97%",
    marginTop: 5,
  },
  imageBox: {
    display: "flex",
    flexDirection: "column" as "column",
    width: "90%",
    paddingTop: 7,
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
  itemContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    // paddingTop: 30,
    width: "30%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    width: "100%",
    flexWrap: "wrap",
    paddingTop: 3,
    paddingBottom: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  menuBox: {
    display: "flex",
    flexDirection: "column" as "column",
    paddingLeft: 5,
  },
  menuTitle: {
    width: "150px",
    fontWeight: "bold",
    color: "dimgray",
    paddingTop: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  introduction: {
    fontWeight: "lighter",
    color: "dimgray",
    paddingTop: 2,
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
    justifyContent: "flex-start",
  },
  tagItem: {
    // marginLeft: 1,
  },
  font: {
    fontStyle: "italic",
    color: "dimgray",
    fontWeight: "bold"
  },
};
