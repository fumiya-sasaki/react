import { ViewColumn } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getData, RecipeData, setData } from "../slices/recipe";
import { RootState } from "../slices/store";
import db from "./core/Firebase";

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
  }, []);

  return (
    <Box style={styles.container}>
      <Button onClick={() => console.log(recipe)}>recipe</Button>
      <Typography style={styles.titleS}>ももこごはん</Typography>
      <Box>
        {contents.map((item) => (
          <Box key={item.id} style={styles.itemContainer}>
            <img src={item.mainImageUrl} alt="" style={styles.image} />
            <Box>
              <Link to={"/content/"} state={{ recipeData: item }}>
                <Typography style={styles.menuTitle}>{item.title}</Typography>
              </Link>
              <Typography>{item.conText}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
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
  titleS: {
    fontSize: "50px",
  },
  image: {
    width: "100px",
    hight: "100px",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "center",
  },
  menuTitle: {
    alignItems: "flex-start",
  },
};
