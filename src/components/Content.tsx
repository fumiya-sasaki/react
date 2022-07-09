import { DriveFileMove } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { getConnectionRecipe, RecipeData } from "../slices/recipe";
import { serchString } from "../slices/screen/serchScreen";
import ConnectionBox from "./contentParts/ConnectionBox";
import Footer from "./Footer";
import Header from "./Header";
import RightContent from "./RightParts";

export const Content = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  type RecipeState = {
    recipeData: RecipeData;
  };

  const serch = (tagItem: string) => {
    if (tagItem) {
      dispatch(serchString({ tag: tagItem }));
      navigation("/serch", { state: { title: tagItem } });
    };
  };

  const { recipeData } = location.state as RecipeState;
  const [connection, setConnection] = useState<RecipeData[]>([]);
  const getConnection = async (): Promise<RecipeData[]> => {
    const data = await getConnectionRecipe(recipeData.tags)
    setConnection(data)
    return data;
  }
  useEffect(() => {
    getConnection();
  }, [recipeData.tags]);

  return (
    <Box>
      <Header title={recipeData.title} />
      <Box style={styles.container}>
        <Box sx={styles.leftContainer}>
          <Box sx={styles.tagsBox}>
            {recipeData.tags.map((tag: string) => (
              <IconButton key={tag} onClick={() => serch(tag)} >
                <DriveFileMove /> {tag}
              </IconButton>
            ))}
          </Box>
          <img src={recipeData.mainImageUrl} alt="" style={styles.image} />
          <Typography sx={styles.introduction}>{recipeData.introduction}</Typography>
          <Divider variant="middle" />
          {recipeData.contents.map((recipe, index) => (
            <Box key={index} sx={styles.contentBox} mt={1} mb={1}>
              {recipe.imageUrls.map((url, index) => (
                <img key={index} src={url} alt="" style={styles.contentImage} />
              ))}
              <Typography style={styles.contentTitle}>{recipe.title}</Typography>
              <Typography>{recipe.text}</Typography>
            </Box>
          ))}
          <Divider variant="middle" />
          <ConnectionBox connection={connection} />
        </Box>
        <RightContent />
      </Box>
      <Footer />
    </Box>
  );
};

export default Content;
const styles = {
  container: {
    display: "flex",
    flexDirection: "row" as "row",
  },
  leftContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    // alignItems: "center",
    // justifyContent: "center",
    width: "70%",
    marginLeft: "10%",
  },
  title: {
    fontSize: "20px",
    marginTop: 30,
    marginBottom: 30,
  },
  image: {
    width: "70%",
    hight: "auto",
  },
  contentImage: {
    width: "50%",
    hight: "auto",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    // alignItems: "center",
    // justifyContent: "center",
  },
  contentTitle: {
    marginTop: 20,
    fontWeight: "bold",
  },
  rightContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "30%",
    marginRight: 5,
  },
  contentBox: {
    // display: "flex",
    // flexDirection: "column" as "column",
    // alignItems: "center",
  },
  introduction: {
    width: "55%",
    flexWrap: "wrap",
    marginTop: 3,
    paddingBottom: 3,
  },
  tagsBox: {
    width: "20%",
    flexWrap: "wrap",
    paddingTop: 1,
    paddingBottom: 1,
  }
};
