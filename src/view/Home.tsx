import { Box } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../hooks';
import { HomeRecipe } from '../slices/recipe';
import { RootState } from '../slices/store';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NewArrivalBox from '../components/homeParts/NewArraivalBox';
import MainImageBox from '../components/homeParts/MainImageBox';
import PickUpWordBox from '../components/homeParts/PickUpWordBox';
import { Config } from '../slices/config';

export const Home = React.memo(() => {
  const recipe: HomeRecipe = useAppSelector((state: RootState) => state.recipe);
  const config: Config = useAppSelector((state: RootState) => state.config);
  return (
    <>
      <Header title={'Home'} />
      <Box sx={styles.container}>
        <MainImageBox mainImages={config.topImages} />
        <Box sx={styles.mainContainer}>
          <NewArrivalBox contents={recipe.newArrival} />
          <PickUpWordBox
            pickUpWords={recipe.pickUpWords}
            pickUpWord={config.pickUpWord}
          />
        </Box>
      </Box>
      <Footer />
    </>
  );
});

export default Home;
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: { xs: '100%', md: '1000px' },
  },
};
