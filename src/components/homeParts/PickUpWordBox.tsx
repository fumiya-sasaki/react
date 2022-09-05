import { Box, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { RecipeData } from '../../slices/recipe';
import { Carousel } from 'react-responsive-carousel';
import { useSize } from '../../hooks';
import { DoubleArrow } from '@mui/icons-material';

export const PickUpWordBox = React.memo(({
  pickUpWords,
  pickUpWord
}: {
  pickUpWords: RecipeData[];
  pickUpWord: string;
}) => {
  const { isMobileSize } = useSize();
  const navigation = useNavigate();
  return (
    <Box sx={styles.newContentBox}>
      <Box sx={styles.titleBox}>
        <Typography sx={styles.font}>{'PickUp 「 ' + pickUpWord + ' 」'}</Typography>
      </Box>
      <Box sx={styles.contentContainerSeason}>
        <Carousel
          showThumbs={false}
          swipeable={true}
          autoPlay={true}
          infiniteLoop={true}
          // emulateTouch={true}
          centerMode={true}
          showStatus={false}
          centerSlidePercentage={40}
        >
          {pickUpWords.map((item) => (
            <Box key={item.uid} style={{ marginBottom: 50 }}>
              <Link to={'/content/'} style={styles.itemContainerSason}
                state={{ recipeData: item }} >
                <img src={item.mainImageUrl} alt='' style={{
                  height: isMobileSize ? '150px' : '200px',
                  objectFit: 'cover',
                }} />
              </Link>
            </Box>
          ))}
        </Carousel>
      </Box>
      <Box sx={styles.buttonBox}>
        <Button onClick={() => navigation('pickUpWord',
          { state: { pickUpWords } })} sx={styles.moreButton}>
          <>more look<DoubleArrow /></></Button>
      </Box>
    </Box>
  );
});

export default PickUpWordBox;
const styles = {
  newContentBox: {
    width: { xs: '95%', sm: '80%' },
    marginTop: 5,
    marginBottom: 10,
  },
  titleBox: {
    padding: 1,
    bgcolor: '#f3f3f2',
    display: 'flex',
    flexDirection: 'row' as 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainerSason: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    width: '100%',
    paddingLeft: 3,
    paddingRight: 3,
  },
  contentContainerSeason: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    width: '100%',
    paddingTop: 3,
    paddingBottom: 3,
    justifyContent: 'space-between',
  },
  menuTitleSason: {
    fontWeight: 'bold',
    color: 'dimgray',
    paddingTop: 1,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    overflow: 'hidden',
  },
  font: {
    fontFamily: 'Georgia',
    color: 'dimgray',
    fontWeight: 'bold'
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
  }
};
