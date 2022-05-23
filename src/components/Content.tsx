import { Box,  Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { RecipeData } from "../slices/recipe";

export const Content = () => {
  const location = useLocation();
  type RecipeState = {
    recipeData: RecipeData;
  };

  const { recipeData } = location.state as RecipeState;

  return (
    <Box style={styles.container}>
      <Typography style={styles.title}>{recipeData.title}</Typography>
      <img src={recipeData.mainImageUrl} alt="" style={styles.image} />
      <Box>
        {recipeData.contents!.map((recipe, index) => (
          <Box key={index}>
            <Typography style={styles.contentTitle}>{recipe.title}</Typography>
            {recipe.imageUrls.map((url, index) => (
              <Box key={index}>
                <img src={url} alt="" style={styles.image} />
              </Box>
            ))}
            <Typography>{recipe.text}</Typography>
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
  title: {
    fontSize: "20px",
    marginTop:30,
    marginBottom:30,
  },
  image: {
    width: "55%",
    hight: "50%",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "center",
  },
  contentTitle: {
   marginTop:20,
  },
};
