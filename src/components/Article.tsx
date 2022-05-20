import {
  Box,
  Button,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getData, RecipeData, setData } from "../slices/recipe";
import { RootState } from "../slices/store";

export const Article = () => {
  const location = useLocation();
  const [title, setTitle] = useState<string>("");
  const [conText, setConText] = useState<string>("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getData());
  }, []);

  const setRecipeData = () => {
    dispatch(setData({ title, conText }));
  };
  return (
    <Box>
      <Button onClick={setRecipeData}>set</Button>
      <TextField
        label="Size"
        id="filled-size-small"
        defaultValue="Small"
        variant="filled"
        size="small"
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextareaAutosize
        aria-label="minimum height"
        minRows={3}
        placeholder="Minimum 3 rows"
        onChange={(e) => setConText(e.target.value)}
      />
    </Box>
  );
};

export default Article;
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
    width: "50%",
    hight: "50%",
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
