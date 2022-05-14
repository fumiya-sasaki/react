import { ViewColumn } from "@mui/icons-material";
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

  const containerS = {
    display: "flex",
    // flexDirection:"column",
    alignItems: "center",
    justifyContent: "center",
  };

  const titleS = {
    fontSize: "50px",
  };
  return (
    <Box style={containerS}>
      <Typography style={titleS}>ももこごはん</Typography>
      <Button onClick={getColecction}>get</Button>
      <Box>
        {contents.map((item) => (
          <Box key={item.id}>
            <Typography>{item.title}</Typography>
            <Typography>{item.conText}</Typography>
            <img src={item.mainImageUrl} alt="" style={{ height: "20%" }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
