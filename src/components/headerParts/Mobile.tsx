import {
  Button, FormControl, InputLabel,
  Menu,
  MenuItem, Select, SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";

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
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick}>MENU</Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => navigation("/")} >ホーム</MenuItem>
        <MenuItem> <FormControl variant="standard" style={{ width: '100%' }}>
          <InputLabel style={styles.fontCategory}>カテゴリー検索</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(event) => categorySerch(event)}
          >
            {categoris.map((data) => (
              <MenuItem key={data} value={data}>
                {data}
              </MenuItem>
            ))}
          </Select>
        </FormControl></MenuItem>
        <MenuItem onClick={() => navigation("/gallery")}>Instagram Gallery</MenuItem>
        <MenuItem onClick={() => navigation("/inquiry")}>お仕事依頼</MenuItem>
      </Menu>
    </>
  );
});

export default Mobile;
const styles = {
  fontCategory: {
    fontStyle: "italic",
    color: "dimgray",
    fontWeight: "bold",
    fontSize: "15px"
  },
};
