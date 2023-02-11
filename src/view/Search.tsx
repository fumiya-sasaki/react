import { Box, Pagination, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useSize } from '../hooks';
import { RecipeData } from '../slices/recipe';
import { RootState } from '../slices/store';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SearchScreenState, searchString, setIsTopScroll } from '../slices/screen/searchScreen';
import RightContent from '../components/RightParts';

const contentsNumber = 10;
export const Search = React.memo(() => {
  const location = useLocation();
  const { title } = location.state as { title: string };
  const screen: SearchScreenState = useAppSelector(
    (state: RootState) => state.searchScreen
  );
  const [contents, setContents] = useState<RecipeData[]>([]);
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { isMobileSize } = useSize();

  useEffect(() => {
    if (screen.isTopScroll) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      dispatch(setIsTopScroll());
    }
  }, [screen.isTopScroll, dispatch]);
  useEffect(() => {
    if (screen.recipeData.length === 0) {
      dispatch(searchString({ tag: title }))
    };
  }, [dispatch]);

  useEffect(() => {
    setContents(screen.recipeData.slice(0, contentsNumber));
    setTotalNumber(Math.ceil(screen.recipeData.length / contentsNumber));
  }, [screen.recipeData]);

  const handlePaginate = useCallback((
    e: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setContents(screen.recipeData.slice((pageNumber - 1) * contentsNumber,
      (pageNumber - 1) * contentsNumber + contentsNumber));
  }, [screen.recipeData]);

  return (
    <>
      <Header title={'検索結果「 ' + title + ' 」'} />
      <Box sx={styles.container}>
        <Box sx={styles.leftContainer}>
          {contents.length > 0 ?
            <><Box sx={styles.contentContainer}>
              {contents.map((item) => (
                <Box key={item.uid} sx={styles.itemContainer}>
                  <img src={item.mainImageUrl} alt='' style={{
                    width: '100%',
                    height: isMobileSize ? '180px' : '300px',
                    objectFit: 'cover',
                  }} />
                  <Link to={'/content/'} state={{ recipeData: item }}>
                    <Typography sx={styles.menuTitle}>{item.title}</Typography>
                  </Link>
                </Box>
              ))}
            </Box>
              <Pagination
                sx={styles.pagenate}
                count={totalNumber}
                shape='rounded'
                color='standard'
                onChange={(e, pageNumber) => handlePaginate(e, pageNumber)}
              /></> :
            <Box>
              <Typography sx={styles.menuTitle}>検索結果がありません</Typography>
            </Box>}
        </Box>
        <RightContent />
      </Box>
      <Footer />
    </>
  );
});

export default Search;
const styles = {
  container: {
    display: 'flex',
    flexDirection: { xs: 'column' as 'column', sm: 'row' as 'row' },
    alignItems: 'space-between',
    justifyContent: 'space-between',
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: { xs: '100%', sm: '70%' },
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: '10px',
    width: { xs: '180px', sm: '30%' },
    paddingBottom: 2,
  },
  contentContainer: {
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'row' as 'row',
    width: { xs: '95%', sm: '80%' },
    paddingTop: 5,
    alignItems: 'flex-start',
  },
  menuTitle: {
    fontFamily: 'Georgia',
    color: 'dimgray',
    fontWeight: 'bold',
  },
  pagenate: {
    marginTop: 5,
    marginBottom: 5,
  },
};
