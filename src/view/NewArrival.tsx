import { Box, Button, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector, useSize } from "../hooks";
import { RecipeData } from "../slices/recipe";
import { RootState } from "../slices/store";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { newArrivalScreenState, nextGetDataScreen } from "../slices/screen/newArrivalScreen";
import { DoubleArrow } from "@mui/icons-material";

export const NewArrival = React.memo(() => {
  const dispatch = useAppDispatch();
  const screen: newArrivalScreenState = useAppSelector((state: RootState) => state.newArrivalScreen);
  const [contents, setContents] = useState<RecipeData[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const { isMobileSize } = useSize();

  useEffect(() => {
    if (screen.recipeData.length === 0) dispatch(nextGetDataScreen({}));
    setContents(screen.recipeData)
  }, [dispatch, screen.recipeData]);

  useEffect(() => {
    setDisabled(screen.lastData);
  }, [screen.lastData]);

  const getNext = useCallback(() => {
    dispatch(nextGetDataScreen({ endAt: screen.recipeData[screen.recipeData.length - 1].createdAt }));
  }, [screen.recipeData]);

  return (
    <>
      <Header title={"New Arrival"} />
      <Box sx={styles.container}>
        <Box sx={styles.box}>
          <Box sx={styles.contentContainer}>
            {contents.map((item) => (
              <Box key={item.uid} sx={styles.itemContainer}>
                <img src={item.mainImageUrl} alt="" style={{
                  width: '100%',
                  height: isMobileSize ? '200px' : '350px',
                  objectFit: 'cover',
                }} />
                <Link to={"/content/"} state={{ recipeData: item }}>
                  <Typography sx={styles.menuTitle}>{item.title}</Typography>
                </Link>
              </Box>
            ))}
          </Box>
          <Button sx={styles.moreButton} onClick={getNext} disabled={disabled}>もっと見る<DoubleArrow /></Button>
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
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: { xs: '100%', md: '1000px' },
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
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
    paddingBottom: 2,
    paddingLeft: '1%',
    paddingRight: '1%',
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: { xs: '48%', sm: '30%' }
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    flexWrap: "wrap",
    paddingTop: 3,
    paddingBottom: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: { xs: '92%', sm: "98%" },
  },
  menuTitle: {
    width: "150px",
    fontWeight: "bold",
    color: "dimgray",
    paddingTop: 1,
    // overflow: "hidden",
    // textOverflow: "ellipsis",
    // whiteSpace: "nowrap"
  },
  font: {
    fontFamily: 'Georgia',
    color: "dimgray",
    fontWeight: "bold"
  },
  moreButton: {
    fontFamily: 'Georgia',
    color: 'dimgray',
    fontWeight: 'bold',
    '&:hover': {
      bgcolor: '#f5f5f5'
    },
    marginBottom: 2,
  },
};
