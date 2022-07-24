import { DoubleArrow } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { RecipeData } from '../../slices/recipe';
import { useSize } from '../../hooks';

export const NewArrivalBox = React.memo(({
  contents,
}: {
  contents: RecipeData[];
}) => {
  const navigation = useNavigate();
  const { isMobileSize } = useSize();
  const width: string = isMobileSize ? '125px' : '165px';
  const height: string = isMobileSize ? '100px' : '130px';

  return (
    <Box sx={styles.newContentBox}>
      <Box sx={styles.titleBox}>
        <Typography sx={styles.font}>New Recipe</Typography>
      </Box>
      <Box sx={styles.contentContainer}>
        {contents.map((item) => (
          <Box key={item.uid} style={styles.itemContainer}>
            <img src={item.mainImageUrl} alt='' style={{
              width,
              height,
              objectFit: 'cover',
            }} />
            <Link to={'/content/'} state={{ recipeData: item }}>
              <Typography sx={styles.menuTitle}>{item.title}</Typography>
            </Link>
          </Box>
        ))}
      </Box>
      <Box sx={styles.buttonBox}>
        <Button onClick={() => navigation('newArrival')} sx={styles.moreButton}>
          <>新着レシピをもっと見る<DoubleArrow /></></Button>
      </Box>
    </Box>
  );
});

export default NewArrivalBox;
const styles = {
  font: {
    fontStyle: 'italic',
    color: 'dimgray',
    fontWeight: 'bold'
  },
  newContentBox: {
    width: { xs: '95%', sm: '80%' },
    marginTop: 5,
  },
  titleBox: {
    padding: 1,
    bgcolor: '#f3f3f2',
    display: 'flex',
    flexDirection: 'row' as 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImage: {
    width: '250px',
    hight: '250px',
    objectFit: 'cover',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    width: '32%',
    alignItems: 'flex-start',
    paddingBottom: 2,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    width: '100%',
    flexWrap: 'wrap',
    paddingTop: 3,
    paddingBottom: 3,
    alignItems: 'center',
    justifyContent: { xs: 'space-between', sm: 'unset' },
  },
  menuTitle: {
    fontWeight: 'bold',
    color: 'dimgray',
    paddingTop: 1,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    overflow: 'hidden',
  },
  buttonBox: {
    position: 'relative'
  },
  moreButton: {
    fontStyle: 'italic',
    color: 'dimgray',
    fontWeight: 'bold',
    '&:hover': {
      bgcolor: '#f5f5f5'
    },
    position: 'absolute',
    right: 0,
  },
};
