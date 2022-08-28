import React from "react";
import {
  Button, FormControl, InputLabel,
  MenuItem, Select, SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  return (
    <>
      <Button onClick={() => navigation("/")} sx={styles.font}>HOME</Button>
      <FormControl sx={{ width: "150px" }} variant="standard">
        <InputLabel style={styles.fontCategory}>SEARCH</InputLabel>
        <Select
          sx={styles.menuFont}
          value={selectedCategory}
          onChange={categorySerch}
        >
          {categoris.map((data) => (
            <MenuItem sx={styles.menuFont} key={data} value={data}>
              {data}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button sx={styles.font} onClick={() => navigation("/gallery")}>INSTAGRAM GALLERY</Button>
      <Button sx={styles.font} onClick={() => navigation("/inquiry")}>CONTACT</Button>
      {/* <Button sx={styles.font} onClick={() => navigation("/profile")}>PROFILE</Button> */}
    </>
  );
});

export default Mobile;
const styles = {
  font: {
    fontFamily: 'Georgia',
    color: "dimgray",
    fontWeight: "bold",
    '&:hover': {
      bgcolor: '#f5f5f5'
    }
  },
  fontCategory: {
    fontFamily: 'Georgia',
    color: "dimgray",
    fontWeight: "bold",
    fontSize: "15px",
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
