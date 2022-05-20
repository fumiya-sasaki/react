import { Box, Button, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RecipeData } from "../slices/recipe";
import { RootState } from "../slices/store";

export const Content = () => {
  const location = useLocation();
  type Recipe = {
    recipeData: RecipeData;
  };

  const { recipeData } = location.state as Recipe;

  return (
    <Box className="App">
      <Typography>{recipeData.title}</Typography>
      <img src={recipeData.mainImageUrl} alt="" style={styles.image} />
      <Box>
        {recipeData.contents!.map((recipe, index) => (
          <Box key={index}>
            <Typography>{recipe.title}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Content;
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
