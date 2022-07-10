import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RecipeData } from "../slices/recipe";
import { RootState } from "../slices/store";
import Header from "./Header";
import Footer from "./Footer";
import { nextGetDataScreen } from "../slices/screen/newArrivalScreen";
import { DoubleArrow } from "@mui/icons-material";
import RightContent from "./RightParts";
import restaurant from "../images/restaurant.png";

export const NewArrival = React.memo(() => {
  const dispatch = useAppDispatch();
  const screen: RecipeData[] = useAppSelector(
    (state: RootState) => state.newArrivalScreen
  );

  const [contents, setContents] = useState<RecipeData[]>([]);

  useEffect(() => {
    if (screen.length === 0) dispatch(nextGetDataScreen({}));
    setContents(screen)
  }, [dispatch, screen]);

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
    flexDirection: { xs: 'column' as 'column', sm: 'row' as 'row' },
    alignItems: { xs: "center", sm: 'unset' },
    justifyContent: { sm: 'space-around' },
  },
  leftContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    width: { xs: '92%', sm: "60%" },
    // paddingLeft: 2
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
  itemImage: {
    width: "100%",
    hight: "100%",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    paddingBottom: 10,
    paddingLeft: '1%',
    paddingRight: '1%',
    // paddingTop: 30,
    width: "31%",
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
  menuTitle: {
    width: "150px",
    fontWeight: "bold",
    color: "dimgray",
    paddingTop: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  font: {
    fontStyle: "italic",
    color: "dimgray",
    fontWeight: "bold"
  },
};
