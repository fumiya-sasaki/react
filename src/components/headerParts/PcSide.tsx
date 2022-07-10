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
      <Button onClick={() => navigation("/")} sx={styles.font}>ホーム</Button>
      <FormControl sx={{ width: "20%" }} variant="standard">
        <InputLabel style={styles.fontCategory}>カテゴリー検索</InputLabel>
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
      <Button sx={styles.font} onClick={() => navigation("/gallery")}>Instagram Gallery</Button>
      <Button sx={styles.font} onClick={() => navigation("/inquiry")}>お仕事依頼</Button>
    </>
  );
});

export default Mobile;
const styles = {
  font: {
    fontStyle: "italic",
    color: "dimgray",
    fontWeight: "bold"
  },
  fontCategory: {
    fontStyle: "italic",
    color: "dimgray",
    fontWeight: "bold",
    fontSize: "15px"
  },
};
