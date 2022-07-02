import {
  Box, Button, FormControl, IconButton,
  Input, InputAdornment, InputLabel, Typography
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { initialData } from "../../slices/recipe";
import { MenuBook, Search } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import { auth } from "../core/Firebase";
import { serchString } from "../../slices/screen/serchScreen";

export const AdminRightParts = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const [tag, setTag] = useState<string>("");

  const serch = (tagItem?: string) => {
    if (tagItem) {
      dispatch(serchString({ tag: tagItem }));
      navigation("/admin/serchh");
    } else {
      dispatch(serchString({ tag }));
      navigation("/admin/serch");
    }
  };

  const logout = async () => {
    await signOut(auth);
    navigation("/login");
  };

  return (
    <>
      <Box sx={styles.titleBox}>
        <Box>
          <Typography sx={{ fontWeight: "bold" }}>
            <MenuBook color={"warning"} />
          </Typography>
        </Box>
        <Typography sx={{ fontWeight: "bold" }}>キーワード検索</Typography>
      </Box>
      <Box sx={styles.serchForm}>
        <FormControl variant="standard">
          <InputLabel>料理名・食材から探す</InputLabel>
          <Input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => serch()} edge="end">
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
      <Button onClick={logout}>ログアウト</Button>
    </>
  );
};

export default AdminRightParts;
const styles = {
  titleBox: {
    padding: 1,
    bgcolor: "#fdeff2",
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
  serchForm: {
    width: "60%",
    paddingTop: 1,
  },
};
