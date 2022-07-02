import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RecipeData } from "../slices/recipe";
import { RootState } from "../slices/store";
import Header from "./Header";
import Footer from "./Footer";
import { nextGetDataScreen } from "../slices/screen/newArrivalScreen";
import { Restaurant } from "@mui/icons-material";
import RightContent from "./RightParts";

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
      <Header title={"Topページ"} />
      <Box sx={styles.container}>
        <Box sx={styles.leftContainer}>
          <Box sx={styles.titleBox}>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>
                <Restaurant color={"warning"} />
              </Typography>
            </Box>
            <Typography sx={{ fontWeight: "bold" }}>新着レシピ</Typography>
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
          <Button onClick={getNext}>next</Button>
        </Box>
        <Box sx={styles.rightContainer}>
          <RightContent />
        </Box>
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
    // marginLeft: 3,
    // marginRight: 5,
    marginTop: 5,
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
    width: "100%",
    // paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 5,
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
  },
  menuBox: {
    display: "flex",
    flexDirection: "column" as "column",
    paddingLeft: 5,
  },
  menuTitle: {
    fontWeight: "bold",
    color: "dimgray",
    paddingTop: 2,
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
};
