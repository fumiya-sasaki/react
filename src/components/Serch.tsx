import { Box, Button, Pagination, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getData, RecipeData, serchString } from "../slices/recipe";
import { RootState } from "../slices/store";
import Header from "./Header";
import main from "../images/main.jpg";
import peperon from "../images/peperon.jpeg";
import fresh from "../images/pastaFresh.jpeg";
import pomodoro from "../images/pomodoro.jpeg";
import Footer from "./Footer";
import { getRecipeData } from "../slices/screen/homeScreen";

export const Serch = () => {
  const dispatch = useAppDispatch();
  const recipe: RecipeData[] = useAppSelector(
    (state: RootState) => state.recipe
  );
  const screen: RecipeData[] = useAppSelector(
    (state: RootState) => state.homeScreen
  );

  const [contents, setContents] = useState<RecipeData[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  useEffect(() => {
    dispatch(getRecipeData({ recipe, pageNumber }));
  }, [recipe]);

  useEffect(() => {
    setContents(screen);
  }, [screen]);

  const handlePaginate = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    dispatch(getRecipeData({ recipe, pageNumber }));
  };

  return (
    <>
      <Header />
      <Box sx={styles.container}>
        <Box sx={styles.contentContainer}>
          {contents.map((item) => (
            <Box key={item.id} style={styles.itemContainer}>
              <img src={item.mainImageUrl} alt="" style={styles.itemImage} />
              <Link to={"/content/"} state={{ recipeData: item }}>
                <Typography sx={styles.menuTitle}>{item.title}</Typography>
              </Link>
            </Box>
          ))}
        </Box>
        <Pagination
          sx={styles.pagenate}
          count={10}
          color="primary"
          onChange={handlePaginate}
        />
      </Box>
      <Footer />
    </>
  );
};

export default Serch;
const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
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
    padding: 3,
    bgcolor: "whitesmoke",
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  imageBox: {
    display: "flex",
    flexDirection: "column" as "column",
    width: "90%",
    paddingTop: 7,
    paddingBottom: 5,
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
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingRight: 20,
    width: "30%",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    width: "100%",
    paddingTop: 5,
    paddingLeft: 5,
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
  pagenate: {
    marginTop: 5,
    marginBottom: 10,
  },
};
