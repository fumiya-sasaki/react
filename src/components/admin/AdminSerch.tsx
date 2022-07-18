import { Box, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector, useSize } from "../../hooks";
import { RecipeData } from "../../slices/recipe";
import { getRecipeData } from "../../slices/screen/serchScreen";
import { RootState } from "../../slices/store";

export const AdminSerch = () => {
  const dispatch = useAppDispatch();
  const { isMobileSize } = useSize();
  const screen: RecipeData[] = useAppSelector(
    (state: RootState) => state.serchScreen
  );

  const [contents, setContents] = useState<RecipeData[]>([]);
  const [totalNumber, setTotalNumber] = useState<number>(1);
  useEffect(() => {
    setContents(screen);
    if (screen.length > 9) {
      setTotalNumber(Math.ceil(screen.length));
    };
  }, [screen]);

  useEffect(() => {
    setContents(screen);
  }, [screen]);

  const handlePaginate = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    dispatch(getRecipeData({ recipe: screen, pageNumber }));
  };

  return (
    <>
      <Box sx={styles.container}>
        <Box sx={styles.contentContainer}>
          {contents.map((item) => (
            <Box key={item.uid} sx={styles.itemContainer}>
              <img src={item.mainImageUrl} alt='' style={{
                width: isMobileSize ? '185px' : '300px',
                height: isMobileSize ? '155px' : '250px',
                objectFit: 'cover',
              }} />
              <Link to={'/admin/article'} state={{ recipeData: item }}>
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
    </>
  );
};

export default AdminSerch;
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
    paddingLeft: "2%",
    width: { xs: "45%", sm: "31%" },
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
