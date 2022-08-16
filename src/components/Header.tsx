import { Box, SelectChangeEvent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useSize } from '../hooks';
import { Category, getCategory } from '../slices/category';
import { searchCategory } from '../slices/screen/searchScreen';
import { RootState } from '../slices/store';
import logo from '../images/chiacchiere.png';
import React from 'react';
import Mobile from './headerParts/Mobile';
import PcSide from './headerParts/PcSide';

export const Header = React.memo(({
  title
}: {
  title: string;
}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const categoryState: Category = useAppSelector((state: RootState) => state.category);
  const [categoris, setCategoris] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [topTitle, setTopTitle] = useState<string>(title);
  useEffect(() => {
    if (categoryState.category.length === 0) dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    setTopTitle(title);
  }, [title]);

  useEffect(() => {
    setCategoris(categoryState.category);
  }, [categoryState, dispatch]);

  const categorySerch = (event: SelectChangeEvent) => {
    const category = event.target.value as string;
    setSelectedCategory(category);
    dispatch(searchCategory({ category }));
    navigation('/search', { state: { title: category } });
  };

  const { isMobileSize } = useSize();
  const menu: JSX.Element = isMobileSize
    ? <Mobile categorySerch={categorySerch} categoris={categoris} selectedCategory={selectedCategory} />
    : <PcSide categorySerch={categorySerch} categoris={categoris} selectedCategory={selectedCategory} />;

  return (
    <>
      <Box style={styles.container}>
        <Link to={'/'} style={styles.logoBox}> <img src={logo} alt='' width={'300px'} /></Link>
        <Box sx={styles.navigation}>
          {menu}
        </Box>
      </Box>
      <Box sx={styles.titleBox}>
        <Typography sx={styles.font}>{topTitle}</Typography>
      </Box>
    </>
  );
});

export default Header;
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 18,
    paddingTop: 15,
    width: '100%',
  },
  logoBox: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  font: {
    fontStyle: 'italic',
    color: 'dimgray',
    fontWeight: 'bold'
  },
  titleBox: {
    padding: 3,
    bgcolor: 'whitesmoke',
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
  },
  navigation: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row' as 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 5,
  },
};
