import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RecipeData } from "../slices/recipe";
import { RootState } from "../slices/store";
import Header from "./Header";
import Footer from "./Footer";
import { newArrivalScreenState, nextGetDataScreen } from "../slices/screen/newArrivalScreen";
import { DoubleArrow } from "@mui/icons-material";
import RightContent from "./RightParts";

export const NewArrival = React.memo(() => {
  const dispatch = useAppDispatch();
  const screen: newArrivalScreenState = useAppSelector((state: RootState) => state.newArrivalScreen);
  const [contents, setContents] = useState<RecipeData[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (screen.recipeData.length === 0) dispatch(nextGetDataScreen({}));
    setContents(screen.recipeData)
  }, [dispatch, screen.recipeData]);

  useEffect(() => {
    setDisabled(screen.lastData);
  }, [screen.lastData]);

  const getNext = () => {
    dispatch(nextGetDataScreen({ endAt: screen.recipeData[screen.recipeData.length - 1].createdAt }));
  };

  return (
    <>
      <Header title={"新着レシピ"} />
      <Box sx={styles.container}>
        <Box sx={styles.contents}>
          <Box sx={styles.leftContainer}>
            <Box sx={styles.contentContainer}>
              {contents.map((item) => (
                <Box key={item.uid} style={styles.itemContainer}>
                  <img src={item.mainImageUrl} alt="" style={{
                    width: '180px',
                    height: '140px',
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
    flexDirection: 'column' as 'column',
    alignItems: "center",
  },
  contents: {
    display: "flex",
    flexDirection: { xs: 'column' as 'column', sm: 'row' as 'row' },
    alignItems: { xs: "center", sm: 'unset' },
    justifyContent: { sm: 'space-around' },
    width: { xs: '100%', md: '1000px' }
  },
  leftContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    width: { xs: '92%', sm: "60%" },
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
  moreButton: {
    fontStyle: 'italic',
    color: 'dimgray',
    fontWeight: 'bold',
    '&:hover': {
      bgcolor: '#f5f5f5'
    },
    marginBottom: 2,
  },
};
