import {
  Box, Button, FormControl, IconButton, Input,
  InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState } from '../slices/store';
import { Search } from '@mui/icons-material';
import { Category } from '../slices/category';
import { serchCategory, serchString } from '../slices/screen/serchScreen';
import instagram from '../images/instagram.png';

export const RightContent = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const [tag, setTag] = useState<string>('');
  const category: Category = useAppSelector(
    (state: RootState) => state.category
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categoris, setCategoris] = useState<string[]>([]);

  const serch = (tagItem?: string) => {
    if (tagItem) {
      dispatch(serchString({ tag: tagItem }));
      navigation('/serch', { state: { title: tagItem } });
    } else {
      dispatch(serchString({ tag }));
      navigation('/serch', { state: { title: tag } });
    };
  };

  const categorySerch = (event: SelectChangeEvent) => {
    const category = event.target.value as string;
    setSelectedCategory(category);
    dispatch(serchCategory({ category }));
    navigation('/serch', { state: { title: category } });
  };
  useEffect(() => {
    setCategoris(category.category);
  }, [category, dispatch]);
  return (
    <Box sx={styles.rightContainer}>
      <Box sx={styles.titleBox}>
        <Typography sx={styles.font}>Categorry</Typography>
      </Box>
      <Box sx={styles.serchForm}>
        <FormControl sx={{ width: "100%" }} variant="standard">
          <Select
            value={selectedCategory}
            onChange={categorySerch}
          >
            {categoris.map((data) => (
              <MenuItem key={data} value={data}>
                {data}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={styles.titleBox}>
        <Typography sx={styles.font}>Key Word</Typography>
      </Box>
      <Box sx={styles.serchForm}>
        <FormControl variant='standard' style={{ width: '100%' }}>
          <InputLabel>料理名・食材から探す</InputLabel>
          <Input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={() => serch()} edge='end' disabled={tag === '' ? true : false}>
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
              onClick={() => serch(item)}
            >
              {'＃' + item}
            </Button>
          </Box>
        ))}
      </Box>
      <Box sx={styles.snsBox}>
        <Typography sx={styles.font}>Official SNS</Typography>
        <hr style={{ width: '90%' }} />
        <a target='_blank' href='https://www.instagram.com/chiacchiere1/'><img src={instagram} alt='' width={'50px'} /></a>
      </Box>
    </Box>
  );
};

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
  serchForm: {
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
    fontStyle: 'italic',
    color: 'dimgray',
    fontWeight: 'bold',
    bgcolor: 'unset',
    '&:hover': {
      bgcolor: '#f5f5f5'
    }
  },
  snsBox: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    paddingTop: 1,
    width: '100%'
  },
  font: {
    fontStyle: 'italic',
    color: 'dimgray',
    fontWeight: 'bold',
  },
  border: {
    borderBottom: 1
  },
};
