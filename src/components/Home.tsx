import { Box, Button, Typography } from "@mui/material";
import {
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import React, {  useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { increment } from "../slices/counterSlice";
import { getData, RecipeData } from "../slices/recipe";
import db from "./core/Firebase";

export const Home = () => {
  const count = useAppSelector((state) => state.count);
  const dispatch = useAppDispatch();


  const [contents, setContents] = useState<RecipeData[]>([]);

  const getColecction = async () => {
    const result = dispatch(getData());
    // console.log(result.data);
      // const newContents = [...contents];
      // setContents([...contents, result]);
  };
  return (
    <Box className="App">
      <Button onClick={getColecction}>get</Button>
      {contents.map((item) => (
        <Box key={item.id}>
          <Typography>{item.id}</Typography>
          <Typography>{item.title}</Typography>
          {item.contents.map((content, index) => (
            <Box key={index}>
              <Typography>{content.text}</Typography>
              <Typography>{content.title}</Typography>
              <Typography>{content.imageUrls[0]}</Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default Home;
