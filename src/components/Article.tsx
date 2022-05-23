import { Box, Button, TextareaAutosize, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks";
import { getData, setData } from "../slices/recipe";

export const Article = () => {
  const [title, setTitle] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [event, setEvent] = useState<any>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getData());
  }, []);

  const setRecipeData = () => {
    dispatch(setData({ title, introduction, event }));
  };

  const handleChangeImage = (e: any) => {
    if (e.target.files[0]) {
      setEvent(e.target.files[0]);
    }
  };
  return (
    <Box>
      <Button onClick={setRecipeData}>set</Button>
      <Button fullWidth variant="contained" component="label">
        プロフィール画像をアップロード
        <input type="file" hidden onChange={handleChangeImage} />
      </Button>
      <TextField
        label="Size"
        id="filled-size-small"
        defaultValue="Small"
        variant="filled"
        size="small"
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextareaAutosize
        aria-label="minimum height"
        minRows={3}
        placeholder="Minimum 3 rows"
        onChange={(e) => setIntroduction(e.target.value)}
      />
    </Box>
  );
};

export default Article;
const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
  },
  titleS: {
    fontSize: "50px",
  },
  image: {
    width: "50%",
    hight: "50%",
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
