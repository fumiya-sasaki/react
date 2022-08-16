import { Box, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useSize } from "../hooks";
import { RecipeData } from "../slices/recipe";
import { RootState } from "../slices/store";
import Header from "./Header";
import Footer from "./Footer";
const contentsNumber = 10;
export const PickUpWord = () => {
  const [contents, setContents] = useState<RecipeData[]>([]);
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const { isMobileSize } = useSize();

  const pickUpWord: RecipeData[] = useAppSelector(
    (state: RootState) => state.recipe.pickUpWords
  );

  useEffect(() => {
    setContents(pickUpWord.slice(0, contentsNumber));
    setTotalNumber(Math.ceil(pickUpWord.length / contentsNumber));
  }, [pickUpWord.length]);

  const handlePaginate = (
    e: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setContents(pickUpWord.slice((pageNumber - 1) * contentsNumber,
      (pageNumber - 1) * contentsNumber + contentsNumber));
  };

  return (
    <>
      <Header title={"PickUp"} />
      <Box sx={styles.container}>
        <Box sx={styles.leftContainer}>
          <Box sx={styles.contentContainer}>
            {contents.map((item) => (
              <Box key={item.uid} sx={styles.itemContainer}>
                <img src={item.mainImageUrl} alt="" style={{
                  width: '100%',
                  height: isMobileSize ? '180px' : '300px',
                  objectFit: 'cover',
                }} />
                <Link to={"/content/"} state={{ recipeData: item }}>
                  <Typography sx={styles.menuTitle}>{item.title}</Typography>
                </Link>
              </Box>
            ))}
          </Box>
          <Pagination
            sx={styles.pagenate}
            count={totalNumber}
            shape="rounded"
            color="standard"
            onChange={(e, pageNumber) => handlePaginate(e, pageNumber)}
          />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default PickUpWord;
const styles = {
  container: {
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
    width: { xs: '100%', sm: "100%" },
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
    width: { xs: "100%", sm: "90%" },
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
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "10px",
    width: { xs: "180px", sm: "30%" },
    paddingBottom: 2,
  },
  contentContainer: {
    flexWrap: "wrap",
    display: "flex",
    flexDirection: "row" as "row",
    width: { xs: "95%", sm: "80%" },
    paddingTop: 5,
    alignItems: "flex-start",
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
    marginBottom: 5,
  },
};
