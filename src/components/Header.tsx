import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Category, getCategory } from "../slices/category";
import { getData, serchCategory, serchString } from "../slices/recipe";
import { RootState } from "../slices/store";

export const Header = () => {
  const dispatch = useAppDispatch();

  const category: Category = useAppSelector(
    (state: RootState) => state.category
  );

  const [categoris, setCategoris] = useState<string[]>([]);
  useEffect(() => {
    dispatch(getCategory());
    setCategoris(category.category);
  }, [category]);

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string);
    dispatch(serchCategory({ category: event.target.value as string }));
  };

  const goHome = () => {};
  return (
    <Box style={styles.container}>
      <Typography style={styles.title}>ももこごはん</Typography>
      <Button onClick={goHome}>ホーム</Button>
      <FormControl sx={{ width: "100px" }}>
        <InputLabel>カテゴリー検索</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleChange}
          input={<OutlinedInput label="カテゴリー検索" />}
        >
          {categoris.map((data) => (
            <MenuItem key={data} value={data}>
              {data}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button>活動実績</Button>
      <Button>お仕事依頼</Button>
    </Box>
  );
};

export default Header;
const styles = {
  container: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 15,
    paddingTop: 15,
  },
  title: {
    fontSize: "30px",
  },
  image: {
    width: "100px",
    hight: "100px",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "center",
  },
  menuTitle: {
    alignItems: "flex-start",
  },
};
