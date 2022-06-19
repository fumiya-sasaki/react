import {
  Box, Button, FormControl, IconButton,
  Input, InputAdornment, InputLabel, Typography
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { initialData, serchString } from "../../slices/recipe";
import { MenuBook, Search } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import { auth } from "../core/Firebase";

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
  container: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "space-between",
    justifyContent: "space-between",
  },
  leftContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
  },
  titleBox: {
    padding: 1,
    bgcolor: "#fdeff2",
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "center",
    width: "97%",
    // marginLeft: 3,
    // marginRight: 5,
    marginTop: 5,
  },
  imageBox: {
    display: "flex",
    flexDirection: "column" as "column",
    width: "90%",
    paddingTop: 7,
    // paddingBottom: 5,
  },
  imageItemF: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "25%",
    hight: "20%",
  },
  itemImage: {
    width: "100%",
    hight: "100%",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    // paddingTop: 30,
    width: "95%",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    width: "100%",
    // paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 5,
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
  },
  menuBox: {
    display: "flex",
    flexDirection: "column" as "column",
    paddingLeft: 5,
  },
  menuTitle: {
    fontWeight: "bold",
    color: "dimgray",
    paddingTop: 2,
  },
  introduction: {
    fontWeight: "lighter",
    color: "dimgray",
    paddingTop: 2,
  },
  rightContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "30%",
    marginRight: 5,
  },
  serchForm: {
    width: "60%",
    paddingTop: 1,
  },
  tagBox: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  tagItem: {
    // marginLeft: 1,
  },
};
