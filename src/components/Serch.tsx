import { Box, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector, useSize } from "../hooks";
import { RecipeData } from "../slices/recipe";
import { RootState } from "../slices/store";
import Header from "./Header";
import Footer from "./Footer";
import { getRecipeData, serchString } from "../slices/screen/serchScreen";

export const Serch = () => {
  const location = useLocation();
  const { title } = location.state as { title: string };
  const [contents, setContents] = useState<RecipeData[]>([]);
  const [totalNumber, setTotalNumber] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { isMobileSize } = useSize();

  const screen: RecipeData[] = useAppSelector(
    (state: RootState) => state.serchScreen
  );

  useEffect(() => {
    if (screen.length === 0) {
      dispatch(serchString({ tag: title }))
    };
    setContents(screen);
    if (screen.length > 9) {
      setTotalNumber(Math.ceil(screen.length));
    };
  }, [screen]);

  const handlePaginate = (
    e: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    dispatch(getRecipeData({ recipe: screen, pageNumber }));
  };

  return (
    <>
      <Header title={"検索結果「 " + title + " 」"} />
      <Box sx={styles.container}>
        <Box sx={styles.contentContainer}>
          {contents.map((item) => (
            <Box key={item.uid} sx={styles.itemContainer}>
              <img src={item.mainImageUrl} alt="" style={{
                width: isMobileSize ? '180px' : '300px',
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
    justifyContent: "center",
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
    width: { xs: "180px", sm: "300px" },
    paddingBottom: 2,
  },
  contentContainer: {
    flexWrap: "wrap",
    display: "flex",
    flexDirection: "row" as "row",
    width: { xs: "95%", sm: "80%" },
    paddingTop: 5,
    // marginLeft: "5%rem",
    alignItems: "flex-start",
    // justifyContent: "center",
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
