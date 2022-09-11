import { Box, Pagination, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSize } from "../hooks";
import { RecipeData } from "../slices/recipe";
import Header from "../components/Header";
import Footer from "../components/Footer";
const contentsNumber = 10;
export const PickUpWord = React.memo(() => {
  const location = useLocation();
  const { pickUpWords } = location.state as { pickUpWords: RecipeData[] };
  const [contents, setContents] = useState<RecipeData[]>([]);
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const { isMobileSize } = useSize();

  useEffect(() => {
    setContents(pickUpWords.slice(0, contentsNumber));
    setTotalNumber(Math.ceil(pickUpWords.length / contentsNumber));
  }, [pickUpWords]);

  const handlePaginate = useCallback((
    e: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setContents(pickUpWords.slice((pageNumber - 1) * contentsNumber,
      (pageNumber - 1) * contentsNumber + contentsNumber));
  }, [pickUpWords]);

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
});

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
    alignItems: "flex-start",
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
    fontFamily: 'Georgia',
    color: 'dimgray',
    fontWeight: 'bold',
    paddingTop: 1,
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
