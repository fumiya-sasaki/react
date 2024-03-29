import {
  Box, Button, FormControl, IconButton, Input,
  InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState } from '../slices/store';
import { Search } from '@mui/icons-material';
import { Category } from '../slices/category';
import { searchCategory, searchString } from '../slices/screen/searchScreen';

export const RightContent = React.memo(() => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const [tag, setTag] = useState<string>('');
  const category: Category = useAppSelector(
    (state: RootState) => state.category
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categoris, setCategoris] = useState<string[]>([]);

  const search = useCallback((tagItem?: string) => {
    if (selectedCategory !== '') {
      setSelectedCategory('');
    }
    if (tagItem) {
      if (tag !== '') {
        setTag('');
      }
      dispatch(searchString({ tag: tagItem }));
      navigation('/search', { state: { title: tagItem } });
    } else {
      dispatch(searchString({ tag }));
      navigation('/search', { state: { title: tag } });
    };
  }, [tag, selectedCategory]);

  const categorySerch = useCallback((event: SelectChangeEvent) => {
    const category = event.target.value as string;
    setSelectedCategory(category);
    if (tag !== '') {
      setTag('');
    }
    dispatch(searchCategory({ category }));
    navigation('/search', { state: { title: category } });
  }, []);
  useEffect(() => {
    setCategoris(category.category);
  }, [category, dispatch]);
  return (
    <Box sx={styles.rightContainer}>
      <Box sx={styles.titleBox}>
        <Typography sx={styles.font}>Categorry</Typography>
      </Box>
      <Box sx={styles.searchForm}>
        <FormControl sx={{ width: "100%" }} variant="standard">
          <Select
            value={selectedCategory}
            onChange={categorySerch}
            sx={styles.font}
          >
            {categoris.map((data) => (
              <MenuItem key={data} value={data} sx={styles.font}>
                {data}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={styles.titleBox}>
        <Typography sx={styles.font}>Key Word</Typography>
      </Box>
      <Box sx={styles.searchForm}>
        <FormControl variant='standard' style={{ width: '100%' }}>
          <InputLabel sx={styles.searchInput}>料理名・食材から探す</InputLabel>
          <Input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            sx={styles.font}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={() => search()} edge='end' disabled={tag === ''}>
                  <Search />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      <Box sx={styles.titleBox}>
        <Typography sx={styles.font}>Top Tags</Typography>
      </Box>
      <Box sx={styles.tagBox}>
        {category.topCategory.map((item) => (
          <Box key={item}>
            <Button
              sx={styles.tagItem}
              onClick={() => search(item)}
            >
              {'＃' + item}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
});

export default RightContent;
const styles = {
  rightContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: { xs: '100%', sm: '30%' },
    marginRight: { sm: 5 },
  },
  titleBox: {
    padding: 1,
    bgcolor: '#f3f3f2',
    display: 'flex',
    flexDirection: 'row' as 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginTop: 5,
  },
  searchForm: {
    width: '90%',
    paddingTop: 1,
  },
  tagBox: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingBottom: 1,
    width: '90%',
  },
  tagItem: {
    fontFamily: 'Georgia',
    color: 'dimgray',
    fontWeight: 'bold',
    bgcolor: 'unset',
    '&:hover': {
      bgcolor: '#f5f5f5'
    }
  },
  searchInput: {
    fontFamily: 'Georgia',
    color: 'dimgray',
    fontWeight: 'bold',
  },
  snsBox: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    paddingTop: 1,
    width: '100%'
  },
  font: {
    fontFamily: 'Georgia',
    color: 'dimgray',
    fontWeight: 'bold',
  },
  border: {
    borderBottom: 1
  },
};
