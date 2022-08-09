import { DriveFileMove } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useSize } from '../hooks';
import { RecipeData } from '../slices/recipe';
import { serchString } from '../slices/screen/serchScreen';
import Footer from './Footer';
import Header from './Header';

export const Content = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  type RecipeState = {
    recipeData: RecipeData;
  };

  const serch = (tagItem: string) => {
      dispatch(serchString({ tag: tagItem }));
      navigation('/serch', { state: { title: tagItem } });
  };

  const { isMobileSize } = useSize();
  const { recipeData } = location.state as RecipeState;
  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    const newTsgs: string[] = [...recipeData.tags];
    newTsgs.length = newTsgs.length > 4 ? 4 : newTsgs.length;
    setTags(newTsgs);
  }, [recipeData.tags]);

  return (
    <>
      <Header title={recipeData.title} />
      <Box sx={styles.container}>
        <Box sx={styles.box} >
          <Box sx={styles.tagsBox}>
            {tags.map((tag: string) => (
              <IconButton key={tag} onClick={() => serch(tag)} size={'small'}>
                <DriveFileMove /> {tag}
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
                    width: isMobileSize ? '70%' : '40%',
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
};

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
  text: {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    // width: '70%',
  }
};
