import {
  Box, Button, FormControl, IconButton,
  Input, InputAdornment, InputLabel, TextField, Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { initialData } from "../../slices/recipe";
import { Search } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import { auth } from "../core/firebase";
import { searchString } from "../../slices/screen/searchScreen";

export const AdminRightParts = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const [tag, setTag] = useState<string>("");

  const search = (tagItem?: string) => {
    if (tagItem) {
      dispatch(searchString({ tag: tagItem }));
      navigation("/admin/searchh");
    } else {
      dispatch(searchString({ tag }));
      navigation("/admin/search");
    }
  };

  const logout = async () => {
    await signOut(auth);
    navigation("/login");
  };

  const goToConfig = async () => {
    navigation('/admin/config');
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.titleBox}>
        <Typography sx={{ fontWeight: "bold" }}>キーワード検索</Typography>
      </Box>
      <Box sx={styles.searchForm}>
        <FormControl variant="standard">
          <InputLabel>料理名・食材から探す</InputLabel>
          <Input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => search()} edge="end">
                  <Search />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      <Link to={"/admin/article"} state={{ recipeData: initialData }}>
        <Typography sx={styles.menuTitle}>新記事</Typography>
      </Link>
      <Button onClick={goToConfig}>INFO</Button>
      <Button onClick={logout}>ログアウト</Button>
    </Box>
  );
};

export default AdminRightParts;
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: { xs: '100%', sm: '30%' },
    marginRight: { sm: 5 },
    marginBottom: 5,
  },
  titleBox: {
    padding: 1,
    bgcolor: '#f3f3f2',
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "center",
    width: "97%",
    marginTop: 5,
  },
  menuTitle: {
    fontWeight: "bold",
    color: "dimgray",
    paddingTop: 2,
  },
  searchForm: {
    width: "60%",
    paddingTop: 1,
  },
};
