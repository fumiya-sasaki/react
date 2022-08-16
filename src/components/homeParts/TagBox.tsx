import { Box, Button, Typography } from '@mui/material';
import React from 'react';

export const TagBox = React.memo(({
  pickUpIngredients,
  search,
}: {
  pickUpIngredients: string[];
    search: (value: string) => void;
}) => {
  return (
    <Box sx={styles.tagContainer}>
      <Box sx={styles.tagContentBox}>
        <Box sx={styles.titleBox}>
          <Typography sx={styles.font}>Season Item</Typography>
        </Box>
        <Box sx={styles.tagBox}>
          {pickUpIngredients.map((item) => (
            <Box key={item} >
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
    </Box>
  );
});

export default TagBox;
const styles = {
  tagContentBox: {
    width: { xs: '100%', md: '40%' },
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
  tagContainer: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    width: { xs: '95%', sm: '80%' },
    justifyContent: 'flex-start',
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
  font: {
    fontStyle: 'italic',
    color: 'dimgray',
    fontWeight: 'bold'
  },
};
