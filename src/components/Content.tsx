import { DriveFileMove } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useSize } from "../hooks";
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

  const { isMobileSize } = useSize();
  const { recipeData } = location.state as RecipeState;
  const [connection, setConnection] = useState<RecipeData[]>([]);
  const getConnection = async (): Promise<RecipeData[]> => {
    const data = await getConnectionRecipe(recipeData.tags)
    setConnection(data)
    return data;
  };
  useEffect(() => {
    if (connection.length === 0) getConnection();
  }, [recipeData.tags]);

  return (
    <>
      <Header title={recipeData.title} />
      <Box sx={styles.container}>
        <Box sx={styles.contents}>
          <Box sx={styles.leftContainer}>
            <Box sx={styles.tagsBox}>
              {recipeData.tags.map((tag: string) => (
                <IconButton key={tag} onClick={() => serch(tag)} size={'small'}>
                  <DriveFileMove /> {tag}
                </IconButton>
              ))}
            </Box>
            <img src={recipeData.mainImageUrl} alt="" style={{
              width: isMobileSize ? '100%' : '500px',
              height: isMobileSize ? '250px' : '380px',
              objectFit: 'cover',
            }} />
            <Typography sx={styles.introduction}>{recipeData.introduction}</Typography>
            <Divider variant="middle" />

            {recipeData.contents.map((recipe, index) => (
              <Box key={index} sx={styles.contentBox} mt={1} mb={1}>
                <Box sx={styles.imgBox}>
                  {recipe.imageUrls.map((url, index) => (
                    <img key={index} src={url} alt="" style={{
                      width: isMobileSize ? '170px' : '200px',
                      height: isMobileSize ? '140px' : '180px',
                      objectFit: 'cover',
                      paddingRight: '10px',
                    }} />
                  ))}
                </Box>
                <Typography style={styles.contentTitle}>{recipe.title}</Typography>
                <Typography style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', width: '70%', }}>{recipe.text}</Typography>
              </Box>
            ))}
            <Divider variant="middle" />
            <ConnectionBox connection={connection} />
          </Box>
          <RightContent />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Content;
const styles = {
  container: {
    display: "flex",
    flexDirection: 'column' as 'column',
    alignItems: "center",
  },
  contents: {
    display: "flex",
    flexDirection: { xs: 'column' as 'column', sm: 'row' as 'row' },
    alignItems: { xs: 'center', sm: 'unset' },
    justifyContent: "space-between",
    width: { xs: '100%', md: '1000px' }
  },
  leftContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: { xs: 'flex-start', sm: "flex-start" },
    justifyContent: "center",
    width: { xs: '92%', sm: "70%" },
    paddingLeft: { xs: 0, sm: 10 }
  },
  title: {
    fontSize: "20px",
    marginTop: 30,
    marginBottom: 30,
  },
  imgBox: {
    display: "flex",
    flexDirection: "row" as "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  contentImage: {
    width: "60%",
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
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: { xs: 'flex-start', sm: 'flex-start' },
    // paddingLeft: { xs: 10, sm: 0 }
  },
  introduction: {
    width: { xs: '85%', sm: '70%' },
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    marginTop: 3,
    paddingBottom: 3,
  },
  tagsBox: {
    // display: "flex",
    // flexDirection: 'row' as 'row',
    // alignItems: "space-between",
    // justifyContent: "space-between",
    width: '70%',
    flexWrap: "wrap",
    paddingTop: 1,
    paddingBottom: 1,
  }
};
