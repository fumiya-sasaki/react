import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RecipeData } from "../slices/recipe";
import { RootState } from "../slices/store";

export const Content = () => {
  const dispatch = useAppDispatch();
  const recipe: RecipeData[] = useAppSelector(
    (state: RootState) => state.recipe
  );

  return (
    <Box className="App">
      <Typography>sasaki</Typography>
    </Box>
  );
};

export default Content;
