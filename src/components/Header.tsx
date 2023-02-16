import { Box, SelectChangeEvent, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useSize } from '../hooks';
import { Category } from '../slices/category';
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
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categorySerch = useCallback(
    (event: SelectChangeEvent) => {
      const category = event.target.value as string;
      setSelectedCategory(category);
      dispatch(searchCategory({ category }));
      navigation('/search', { state: { title: category } });
    }, [dispatch, navigation]);

  const isMobileSize = useSize();
  const menu: JSX.Element = useMemo(() => {
    return isMobileSize
      ? <Mobile categorySerch={categorySerch}
        categoris={categoryState.category}
        selectedCategory={selectedCategory} />
      : <PcSide categorySerch={categorySerch}
        categoris={categoryState.category}
        selectedCategory={selectedCategory} />
  }, [categoryState.category, selectedCategory, isMobileSize]);

  return (
    <>
      <Box style={styles.container}>
        <Typography sx={styles.name}>Momoko Wakabayashi</Typography>
        <Link to={'/'} style={styles.logoBox}>
          <img src={logo} alt='' width={'250px'} />
        </Link>
        <Box sx={styles.navigation}>
          {menu}
        </Box>
      </Box>
      <Box sx={styles.titleBox}>
        <Typography sx={styles.font}>{title}</Typography>
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
  name: {
    fontFamily: 'Georgia',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'dimgray',
    // paddingRight: 20,
    marginTop: 2,
    marginBottom: 2,
  },
  logoBox: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  font: {
    fontFamily: 'Georgia',
    color: 'dimgray',
    fontWeight: 'bold',
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
    gap: { xs: 2, md: 5 },
  },
};
