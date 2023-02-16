import { Box, Button, Typography, } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useSize } from '../../hooks';
import { RecipeData } from '../../slices/recipe';
import { RootState } from '../../slices/store';
import { DoubleArrow, } from '@mui/icons-material';
import AdminRightParts from './AdminRightParts';
import { nextGetDataScreen } from '../../slices/admin';
import { getCategory } from '../../slices/category';

export const AdminHome = () => {
  const dispatch = useAppDispatch();
  const admin: RecipeData[] = useAppSelector((state: RootState) => state.admin);
  const isMobileSize = useSize();
  const [contents, setContents] = useState<RecipeData[]>([]);

  useEffect(() => {
    if (admin.length === 0) {
      dispatch(getCategory());
      dispatch(nextGetDataScreen({}));
    };
  }, [dispatch, admin.length]);

  useEffect(() => {
    setContents(admin);
  }, [admin]);

  const getNext = () => {
    dispatch(nextGetDataScreen({ endAt: contents[contents.length - 1].createdAt }));
  };

  return (
    <>
      <Box sx={styles.container}>
        <Box sx={styles.leftContainer}>
          <Box sx={styles.titleBox}>
            <Typography sx={styles.font}>新着レシピ</Typography>
          </Box>
          <Box sx={styles.contentContainer}>
            {contents.map((item, index) => (
              <Box key={index} style={styles.itemContainer}>
                <img src={item.mainImageUrl} alt='' style={{
                  width: isMobileSize ? '185px' : '300px',
                  height: isMobileSize ? '155px' : '250px',
                  objectFit: 'cover',
                }} />
                <Link to={'/admin/article'} state={{ recipeData: item }}>
                  <Typography sx={styles.menuTitle}>{item.title}</Typography>
                </Link>
              </Box>
            ))}
          </Box>
          <Button style={{ width: '80%' }} onClick={getNext}>もっと見る<DoubleArrow /></Button>
        </Box>
        <AdminRightParts />
      </Box>
    </>
  );
};

export default AdminHome;
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
  titleBox: {
    padding: 1,
    bgcolor: '#f3f3f2',
    display: 'flex',
    flexDirection: 'row' as 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 5,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    width: '100%',
    flexWrap: 'wrap',
    paddingTop: 3,
    paddingBottom: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  menuBox: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    paddingLeft: 5,
  },
  menuTitle: {
    fontWeight: 'bold',
    color: 'dimgray',
    paddingTop: 2,
    width: { xs: '185px', sm: '165px' },
  },
  font: {
    fontFamily: 'Georgia',
    color: 'dimgray',
    fontWeight: 'bold'
  },
};
