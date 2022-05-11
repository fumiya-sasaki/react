import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getData, RecipeData } from "../slices/recipe";
import { RootState } from "../slices/store";

export const Home = () => {
  const dispatch = useAppDispatch();
  const recipe: RecipeData[] = useAppSelector(
    (state: RootState) => state.recipe
  );

  const [contents, setContents] = useState<RecipeData[]>([]);

  const getColecction = async () => {
    dispatch(getData());
  };
  useEffect(() => {
    setContents(recipe);
  }, [recipe]);
  return (
    <Box className="App">
      <Button onClick={getColecction}>get</Button>
      {contents.map((item) => (
        <Box key={item.id}>
          <Typography>{item.title}</Typography>
          <Typography>{item.conText}</Typography>
          <img src={item.mainImageUrl} alt="" style={{ height: "20%" }} />
        </Box>
      ))}
    </Box>
  );
};

export default Home;
