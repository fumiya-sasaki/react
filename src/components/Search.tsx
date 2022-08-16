import { Box, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector, useSize } from "../hooks";
import { RecipeData } from "../slices/recipe";
import { RootState } from "../slices/store";
import Header from "./Header";
import Footer from "./Footer";
import { searchString } from "../slices/screen/searchScreen";
import RightContent from "./RightParts";

const contentsNumber = 10;
export const Search = () => {
  const location = useLocation();
  const { title } = location.state as { title: string };
  const [contents, setContents] = useState<RecipeData[]>([]);
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { isMobileSize } = useSize();

  const screen: RecipeData[] = useAppSelector(
    (state: RootState) => state.searchScreen
  );

  useEffect(() => {
    setContents(screen.slice(0, contentsNumber));
    setTotalNumber(Math.ceil(screen.length / contentsNumber));
    if (screen.length === 0) {
      dispatch(searchString({ tag: title }))
    };
  }, [screen.length]);

  const handlePaginate = (
    e: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setContents(screen.slice((pageNumber - 1) * contentsNumber,
      (pageNumber - 1) * contentsNumber + contentsNumber));
  };

  return (
    <>
      <Header title={"検索結果「 " + title + " 」"} />
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
        <RightContent />
      </Box>
      <Footer />
    </>
  );
};

export default Search;
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
    width: { xs: '100%', sm: "70%" },
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
