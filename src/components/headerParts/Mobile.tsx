import {
  Button, FormControl, InputLabel,
  Menu,
  MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';

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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    if (openCategory) setOpenCategory(false);
    setAnchorEl(null);
  };
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
          <InputLabel style={styles.fontCategory}>CATEGORY</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(event) => categorySerch(event)}
            onClose={handleClose}
            onOpen={() => setOpenCategory(true)}
            open={openCategory}
          >
            {categoris.map((data) => (
              <MenuItem key={data} value={data}>
                {data}
              </MenuItem>
            ))}
          </Select>
        </FormControl></MenuItem>
        <MenuItem onClick={() => navigation('/gallery')} sx={styles.font}>INSTAGRAM GALLERY</MenuItem>
        <MenuItem onClick={() => navigation('/inquiry')} sx={styles.font}>CONTACT</MenuItem>
      </Menu>
    </>
  );
});

export default Mobile;
const styles = {
  fontCategory: {
    fontStyle: 'italic',
    color: 'dimgray',
    fontWeight: 'bold',
    fontSize: '15px',
    '&:hover': {
      bgcolor: '#f5f5f5'
    }
  },
  font: {
    fontStyle: 'italic',
    color: 'dimgray',
    fontWeight: 'bold',
    '&:hover': {
      bgcolor: '#f5f5f5'
    }
  },
};
