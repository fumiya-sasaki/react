import { Box, Button, TextareaAutosize, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks";
import { Content, getData, setData, SubmitRecipe } from "../slices/recipe";

export const Article = () => {
  const [title, setTitle] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [mainImageUrl, setMainImage] = useState<string>("");
  const [recipeContents, setRecipeContents] = useState<Content[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getData());
  }, []);

  const setRecipeData = () => {
    const newRecipeData: SubmitRecipe = {
      title,
      mainImageUrl,
      introduction,
      contents: recipeContents,
    };
    dispatch(setData(newRecipeData));
  };

  const onChangeContentImage = async (e: any, index: number) => {
    if (e.target.files[0]) {
      const newRecipeContents: Content[] = [...recipeContents];
      newRecipeContents[index].imageUrls[
        newRecipeContents[index].imageUrls.length
      ] = URL.createObjectURL(e.target.files[0]);
      setRecipeContents(newRecipeContents);
    }
  };

  const addForm = () => {
    const newContent: Content = {
      imageUrls: [],
      text: "",
      title: "",
    };
    const newRecipeContents: Content[] = [...recipeContents, newContent];
    setRecipeContents(newRecipeContents);
  };

  const onChangeTitle = (value: string, index: number) => {
    const newRecipeContents: Content[] = [...recipeContents];
    newRecipeContents[index].title = value;
    setRecipeContents(newRecipeContents);
  };

  const onChangeText = (value: string, index: number) => {
    const newRecipeContents: Content[] = [...recipeContents];
    newRecipeContents[index].text = value;
    setRecipeContents(newRecipeContents);
  };

  const onChangeMainImage = (e: any) => {
    if (e.target.files[0]) {
      setMainImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Box>
      <Button onClick={setRecipeData}>set</Button>
      <Button onClick={addForm}>add</Button>
      <Box>
        <TextField
          label="Size"
          value={title}
          variant="filled"
          size="small"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextareaAutosize
          minRows={3}
          onChange={(e) => setIntroduction(e.target.value)}
          value={introduction}
        />
        <Button fullWidth variant="contained" component="label">
          main画像をアップロード
          <input type="file" hidden onChange={(e) => onChangeMainImage(e)} />
        </Button>
        <Box>
          <img src={mainImageUrl} alt="" style={styles.image} />
        </Box>
      </Box>
      {recipeContents?.map((content, index) => (
        <Box key={index} style={styles.itemBox}>
          <Button fullWidth variant="contained" component="label">
            プロフィール画像をアップロード
            <input
              type="file"
              hidden
              onChange={(e) => onChangeContentImage(e, index)}
            />
          </Button>
          {content.imageUrls.map((url, imgIndex) => (
            <Box key={imgIndex}>
              <img src={url} alt="" style={styles.image} />
            </Box>
          ))}
          <TextField
            label="Size"
            value={content.title}
            variant="filled"
            size="small"
            onChange={(e) => onChangeTitle(e.target.value, index)}
          />
          <TextareaAutosize
            minRows={3}
            onChange={(e) => onChangeText(e.target.value, index)}
            value={content.text}
          />
        </Box>
      ))}
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
  itemBox: {
    width: "50%",
  },
};
