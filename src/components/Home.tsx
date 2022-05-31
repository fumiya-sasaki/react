import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getData, RecipeData } from "../slices/recipe";
import { RootState } from "../slices/store";
import Header from "./Header";
import main from "../images/main.jpg";
import peperon from "../images/peperon.jpeg";
import fresh from "../images/pastaFresh.jpeg";
import pomodoro from "../images/pomodoro.jpeg";
import Footer from "./Footer";

export const Home = () => {
  const dispatch = useAppDispatch();
  const recipe: RecipeData[] = useAppSelector(
    (state: RootState) => state.recipe
  );

  const [contents, setContents] = useState<RecipeData[]>([]);

  useEffect(() => {
    setContents(recipe);
  }, [recipe]);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);
  return (
    <Box sx={styles.container}>
      <Header />
      <Box sx={styles.titleBox}>
        <Typography sx={{ fontWeight: "bold" }}>春野菜特集</Typography>
      </Box>
      <Box sx={styles.imageBox}>
        <Box sx={styles.imageItemF}>
          <img src={main} alt="" style={styles.image} />
          <img src={peperon} alt="" style={styles.image} />
        </Box>
        <Box sx={styles.imageItemF}>
          <img src={fresh} alt="" style={styles.image} />
          <img src={pomodoro} alt="" style={styles.image} />
        </Box>
      </Box>
      <Box>
        {contents.map((item) => (
          <Box key={item.id} style={styles.itemContainer}>
            <img src={item.mainImageUrl} alt="" style={styles.image} />
            <Box sx={styles.menuBox}>
              <Link to={"/content/"} state={{ recipeData: item }}>
                <Typography sx={styles.menuTitle}>{item.title}</Typography>
              </Link>
              <Typography sx={styles.introduction}>
                {item.introduction}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
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
  itemContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: 100,
    paddingTop: 30,
    width: "95%",
  },
  menuBox: {
    display: "flex",
    flexDirection: "column" as "column",
    paddingLeft: 5,
  },
  menuTitle: {
    fontWeight: "bold",
    color: "dimgray",
  },
  introduction: {
    fontWeight: "lighter",
    color: "dimgray",
    paddingTop: 2,
  },
};
