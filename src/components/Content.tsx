import { Box, Button, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RecipeData } from "../slices/recipe";
import { RootState } from "../slices/store";

export const Content = () => {
  const location = useLocation();
  interface State {
    title: string;
  }
  const recipe: RecipeData[] = useAppSelector(
    (state: RootState) => state.recipe
  );
  const { title } = location.state as State;

  return (
    <Box className="App">
      <Typography>{title}</Typography>
    </Box>
  );
};

export default Content;
