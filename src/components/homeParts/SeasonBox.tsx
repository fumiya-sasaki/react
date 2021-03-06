import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import { RecipeData } from '../../slices/recipe';
import { Carousel } from 'react-responsive-carousel';
import { useSize } from '../../hooks';

export const SeasonBox = React.memo(({
  season,
}: {
  season: RecipeData[];
}) => {
  const { isMobileSize } = useSize();
  return (
    <Box sx={styles.newContentBox}>
      <Box sx={styles.titleBox}>
        <Typography sx={styles.font}>Season Recipe</Typography>
      </Box>
      <Box sx={styles.contentContainerSeason}>
        <Carousel
          showThumbs={false}
          swipeable={true}
          autoPlay={true}
          infiniteLoop={true}
          emulateTouch={true}
          centerMode={true}
          showStatus={false}
          centerSlidePercentage={40}
        >
          {season.map((item) => (
            <Box key={item.uid} style={styles.itemContainerSason}>
              <img src={item.mainImageUrl} alt='' style={{
                height: isMobileSize ? '100px' : '150px',
                objectFit: 'cover',
              }} />
              <Link to={'/content/'} state={{ recipeData: item }} style={{ marginBottom: '50px' }}>
                <Typography sx={styles.menuTitleSason}>{item.title}</Typography>
              </Link>
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
});

export default SeasonBox;
const styles = {
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
    fontStyle: 'italic',
    color: 'dimgray',
    fontWeight: 'bold'
  },
};
