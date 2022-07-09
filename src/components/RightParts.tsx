import {
  Box, Button, Divider, FormControl, IconButton, Input,
  InputAdornment, InputLabel, Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../slices/store";
import { Search } from "@mui/icons-material";
import { Category } from "../slices/category";
import { serchString } from "../slices/screen/serchScreen";
import search from "../images/search.png";
import tagImg from "../images/tag.png";
import instagram from "../images/instagram.png";

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
    <Box sx={styles.rightContainer}>
      <Box sx={styles.titleBox}>
        <img src={search} alt="" width={"50px"} />
        <Typography sx={styles.font}>キーワード検索</Typography>
      </Box>
      <Box sx={styles.serchForm}>
        <FormControl variant="standard">
          <InputLabel>料理名・食材から探す</InputLabel>
          <Input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => serch()} edge="end" disabled={tag === "" ? true : false}>
                  <Search />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      <Box sx={styles.titleBox}>
        <img src={tagImg} alt="" width={"50px"} />
        <Typography sx={styles.font}>人気タグ検索</Typography>
      </Box>
      <Box sx={styles.tagBox}>
        {category.topCategory.map((item) => (
          <Box key={item}>
            <Button
              sx={styles.tagItem}
              // color={"warning"}
              onClick={() => serch(item)}
            >
              {"＃" + item}
            </Button>
          </Box>
        ))}
      </Box>
      <Box sx={styles.snsBox}>
        <Typography sx={styles.font}>公式SNS</Typography>
        <hr style={{ width: "90%" }} />

        <a target="_blank" href='https://www.instagram.com/chiacchiere1/'>  <img src={instagram} alt="" width={"50px"} /></a>

      </Box>
    </Box>
  );
};

export default RightContent;
const styles = {
  rightContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "30%",
    marginRight: 5,
    // bgcolor: "#f3f3f2",
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
    bgcolor: "#f3f3f2",
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
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
  // rightContainer: {
  //   display: "flex",
  //   flexDirection: "column" as "column",
  //   alignItems: "center",
  //   justifyContent: "flex-start",
  //   width: "30%",
  //   marginRight: 5,
  // },
  serchForm: {
    width: "90%",
    paddingTop: 1,
  },
  tagBox: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    paddingBottom: 1,
    width: "90%",
  },
  tagItem: {
    fontStyle: "italic",
    color: "dimgray",
    fontWeight: "bold",
    bgcolor: "unset",
    "&:hover": {
      bgcolor: "#f5f5f5"
    }
  },
  snsBox: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    paddingTop: 1,
    width: "100%"
  },
  font: {
    fontStyle: "italic",
    color: "dimgray",
    fontWeight: "bold",

  },
  border: {
    borderBottom: 1
  },
  // form: {
  //   "&:hover": {
  //     color: "red"
  //   },
  // '& label.Mui-focused': {
  //   color: 'green',
  // },
  // '& .MuiInput-underline:after': {
  //   borderBottomColor: 'green',
  // },
  // '& .MuiOutlinedInput-root': {
  //   '& fieldset': {
  //     borderColor: 'red',
  //   },
  //   '&:hover fieldset': {
  //     borderColor: 'yellow',
  //   },
  //   '&.Mui-focused fieldset': {
  //     borderColor: 'green',
  //   },
  // },
  // }
};
