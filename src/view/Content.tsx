import React from 'react';
import { DriveFileMove } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useSize } from '../hooks';
import { RecipeData } from '../slices/recipe';
import { searchString } from '../slices/screen/searchScreen';
import Footer from '../components/Footer';
import Header from '../components/Header';

export const Content = React.memo(() => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const search = useCallback((tagItem: string) => {
    dispatch(searchString({ tag: tagItem }));
    navigation('/search', { state: { title: tagItem } });
  }, []);

  const isMobileSize = useSize();
  const { recipeData } = location.state as { recipeData: RecipeData };
  return (
    <>
      <Header title={recipeData.title} />
      <Box sx={styles.container}>
        <Box sx={styles.box} >
          <Box sx={styles.tagsBox}>
            {recipeData.tags.slice(0, 3).map((tag: string) => (
              <IconButton key={tag} onClick={() => search(tag)} size={'small'}>
                <DriveFileMove /> <Typography sx={styles.tag}>{tag}</Typography>
              </IconButton>
            ))}
          </Box>
          <img src={recipeData.mainImageUrl} alt='' style={{
            width: isMobileSize ? '96%' : '50%',
            height: 'auto',
            objectFit: 'cover',
          }} />
          <Typography sx={styles.introduction}>{recipeData.introduction}</Typography>

          {recipeData.contents.map((recipe, index) => (
            <Box key={index} sx={styles.contentBox} mt={1} mb={1}>
              <Box sx={styles.imgBox}>
                {recipe.imageUrls.map((url, index) => (
                  <img key={index} src={url} alt='' style={{
                    width: isMobileSize ? '70%' : '37%',
                    height: 'auto',
                    objectFit: 'cover',
                    paddingBottom: '2%',
                    paddingLeft: 10,
                  }} />
                ))}
              </Box>
              <Typography sx={styles.contentTitle}>{recipe.title}</Typography>
              <Typography sx={styles.text}>{recipe.text}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Footer />
    </>
  );
});

export default Content;
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingLeft: { xs: 0, sm: 10 }
  },
  box: {
    width: { xs: '100%', md: '1000px' },
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
  },
  title: {
    fontSize: '20px',
    marginTop: 30,
    marginBottom: 30,
  },
  imgBox: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    // justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '100%',
    gap: '20%',
    // paddingLeft: { xs: 1, sm: 0 }
  },
  contentImage: {
    width: '60%',
    hight: 'auto',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row' as 'row',
  },
  contentTitle: {
    marginTop: '30px',
    fontWeight: 'bold',
  },
  rightContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '30%',
    marginRight: 5,
  },
  contentBox: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: { xs: 'flex-start', sm: 'flex-start' },
    width: '100%',
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
    width: '70%',
    flexWrap: 'wrap',
    paddingTop: 1,
    paddingBottom: 2,
  },
  tag:{
    fontFamily: 'Georgia',
    color: 'dimgray',
    fontWeight: 'bold',
  },
  text: {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    // width: '70%',
  }
};
