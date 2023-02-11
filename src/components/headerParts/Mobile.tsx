import {
  Button, FormControl, InputLabel, Menu,
  MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useCallback } from 'react';

export const Mobile = React.memo(({
  categorySerch,
  categoris,
  selectedCategory,
}: {
  categorySerch: (event: SelectChangeEvent) => void;
  categoris: string[];
  selectedCategory: string;
}) => {
  const navigation = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openCategory, setOpenCategory] = React.useState(false);

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    if (openCategory) {
      setOpenCategory(false);
    }
    setAnchorEl(null);
  }, [openCategory]);
  return (
    <>
      <Button onClick={handleClick} sx={styles.font}>MENU</Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => navigation('/')} sx={styles.font}>HOME</MenuItem>
        <MenuItem> <FormControl variant='standard' style={{ width: '100%', marginTop: '-20px' }}>
          <InputLabel style={styles.fontCategory}>SEARCH</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(event) => categorySerch(event)}
            onClose={handleClose}
            onOpen={() => setOpenCategory(true)}
            open={openCategory}
            sx={styles.menuFont}
          >
            {categoris.map((data) => (
              <MenuItem sx={styles.menuFont} key={data} value={data}>
                {data}
              </MenuItem>
            ))}
          </Select>
        </FormControl></MenuItem>
        <MenuItem onClick={() => navigation('/gallery')} sx={styles.font}>INSTAGRAM GALLERY</MenuItem>
        <MenuItem onClick={() => navigation('/inquiry')} sx={styles.font}>CONTACT</MenuItem>
        {/* <MenuItem onClick={() => navigation("/profile")} sx={styles.font}>PROFILE</MenuItem> */}
      </Menu>
    </>
  );
});

export default Mobile;
const styles = {
  fontCategory: {
    fontFamily: 'Georgia',
    color: 'dimgray',
    fontWeight: 'bold',
    fontSize: '15px',
    '&:hover': {
      bgcolor: '#f5f5f5'
    }
  },
  font: {
    fontFamily: 'Georgia',
    color: 'dimgray',
    fontWeight: 'bold',
    '&:hover': {
      bgcolor: '#f5f5f5'
    },
    paddingRight: 1,
  },
  menuFont: {
    fontWeight: 'bold',
    fontFamily: 'Georgia',
    color: "dimgray",
  }
};
