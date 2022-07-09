import {
  Box, Button, FormControl, InputLabel,
  MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Category, getCategory } from "../slices/category";
import { serchCategory } from "../slices/screen/serchScreen";
import { RootState } from "../slices/store";
import logo from "../images/logo.png";

type HeaderState = {
  title: string;
};

export const Header: React.FC<HeaderState> = ({ title }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const category: Category = useAppSelector(
    (state: RootState) => state.category
  );

  const [categoris, setCategoris] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [topTitle, setTopTitle] = useState<string>("");
  useEffect(() => {
    dispatch(getCategory());
    setCategoris(category.category);
  }, [category, dispatch]);

  useEffect(() => {
    if (title) {
      setTopTitle(title);
    }
  }, [title]);

  const categorySerch = (event: SelectChangeEvent) => {
    const category = event.target.value as string;
    setSelectedCategory(category);
    dispatch(serchCategory({ category }));
    navigation("/serch", { state: { title: category } });
  };

  return (
    <>
      <Box style={styles.container}>
        <Link to={"/"} style={styles.logoBox}> <img src={logo} alt="" width={"40%"} /></Link>
        <Box sx={styles.navigation}>
          <Button onClick={() => navigation("/")} sx={styles.font}>ホーム</Button>
          <FormControl sx={{ width: "20%" }} variant="standard">
            <InputLabel style={styles.fontCategory}>カテゴリー検索</InputLabel>
            <Select
              value={selectedCategory}
              onChange={categorySerch}
            // input={<StandardInput label="カテゴリー検索" />}
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
        </Box>
      </Box>
      <Box sx={styles.titleBox}>
        <Typography sx={styles.font}>{topTitle}</Typography>
      </Box>
    </>
  );
};

export default Header;
const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 15,
    paddingTop: 15,
    width: "100%",
  },
  logoBox: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
  },
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
  titleBox: {
    padding: 3,
    bgcolor: "whitesmoke",
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
  },
  navigation: {
    width: "100%",
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 5,
  },
};
