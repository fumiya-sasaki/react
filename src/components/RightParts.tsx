import {
  Box, Button, FormControl, IconButton, Input,
  InputAdornment, InputLabel, Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../slices/store";
import { EmojiFlags, Instagram, MenuBook, Search } from "@mui/icons-material";
import { Category } from "../slices/category";
import { serchString } from "../slices/screen/serchScreen";

export const RightContent = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const [tag, setTag] = useState<string>("");
  const category: Category = useAppSelector(
    (state: RootState) => state.category
  );

  const serch = (tagItem?: string) => {
    if (tagItem) {
      dispatch(serchString({ tag: tagItem }));
      navigation("/serch", { state: { title: tagItem } });
    } else {
      dispatch(serchString({ tag }));
      navigation("/serch", { state: { title: tag } });
    };
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
      <Box sx={styles.titleBox}>
        <Box>
          <Typography sx={{ fontWeight: "bold" }}>
            <EmojiFlags color={"warning"} />
          </Typography>
        </Box>
        <Typography sx={{ fontWeight: "bold" }}>人気タグ検索</Typography>
      </Box>

      <Box sx={styles.tagBox}>
        {category.topCategory.map((item) => (
          <Box key={item} sx={styles.tagItem}>
            <Button
              variant="outlined"
              color={"warning"}
              onClick={() => serch(item)}
            >
              {item}
            </Button>
          </Box>
        ))}
      </Box>
      <Box sx={styles.snsBox}>
        <Typography sx={{ fontWeight: "bold" }}>公式SNS</Typography>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <a target="_blank" href='https://www.instagram.com/chiacchiere1/'>  <Instagram /></a>
        </IconButton>
      </Box>
    </>
  );
};

export default RightContent;
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
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingBottom: 1,
  },
  tagItem: {
    margin: 1,
  },
  snsBox: {
    paddingTop: 1
  },
};
