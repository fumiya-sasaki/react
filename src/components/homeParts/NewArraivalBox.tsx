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
  const isMobileSize = useSize();

  return (
    <Box sx={styles.newContentBox}>
      <Box sx={styles.titleBox}>
        <Typography sx={styles.font}>New Arrival</Typography>
      </Box>
      <Box sx={styles.contentContainer}>
        {contents.map((item) => (
          <Link to={'/content/'} key={item.uid} style={styles.itemContainer} state={{ recipeData: item }}>
            <img src={item.mainImageUrl} alt='' style={{
              width: '100%',
              height: isMobileSize ? '150px' : '200px',
              objectFit: 'cover',
              paddingBottom: '10px',
            }} />
          </Link>
        ))}
      </Box>
      <Box sx={styles.buttonBox}>
        <Button onClick={() => navigation('newArrival')} sx={styles.moreButton}>
          <>more look<DoubleArrow /></></Button>
      </Box>
    </Box>
  );
});

export default NewArrivalBox;
const styles = {
  font: {
    fontFamily: 'Georgia',
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
    width: '31%',
    alignItems: 'space-between',
    paddingBottom: 2,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    width: '100%',
    flexWrap: 'wrap',
    paddingTop: 3,
    paddingBottom: 3,
    alignItems: 'space-between',
    justifyContent: 'space-between',
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
    fontFamily: 'Georgia',
    color: 'dimgray',
    fontWeight: 'bold',
    '&:hover': {
      bgcolor: '#f5f5f5'
    },
    position: 'absolute',
    right: 0,
  },
};
