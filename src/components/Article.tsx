import { Box, Button, TextareaAutosize, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks";
import { Content, getData, setData, SubmitRecipe } from "../slices/recipe";
import TopForm from "./fromParts/TopForm";

export const Article = () => {
  const [title, setTitle] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [mainImageUrl, setMainImage] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [recipeContents, setRecipeContents] = useState<Content[]>([
    {
      imageUrls: [],
      text: "",
      title: "",
    },
  ]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const setRecipeData = () => {
    const newRecipeData: SubmitRecipe = {
      title,
      mainImageUrl,
      introduction,
      contents: recipeContents,
      category,
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

  const deleteForm = (index: number) => {
    const newRecipeContents: Content[] = recipeContents.splice(index + 1, 1);
    console.log(newRecipeContents);
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

  return (
    <Box sx={styles.container}>
      <TopForm
        title={title}
        introduction={introduction}
        mainImageUrl={mainImageUrl}
        setTitle={setTitle}
        setIntroduction={setIntroduction}
        setMainImage={setMainImage}
      />
      {recipeContents?.map((content, index) => (
        <Box key={index} style={styles.itemContainer}>
          <TextField
            label="Size"
            value={content.title}
            variant="filled"
            fullWidth
            onChange={(e) => onChangeTitle(e.target.value, index)}
          />
          <TextareaAutosize
            minRows={10}
            style={styles.textArea}
            onChange={(e) => onChangeText(e.target.value, index)}
            value={content.text}
          />
          <Button variant="contained" sx={styles.button} component="label">
            画像追加
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
          <Button variant="contained" onClick={() => deleteForm(index)}>
            削除
          </Button>
        </Box>
      ))}
      <Button variant="contained" sx={styles.button} onClick={addForm}>
        追加
      </Button>
      <Button variant="contained" onClick={setRecipeData}>
        レシピ追加
      </Button>
    </Box>
  );
};

export default Article;
const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 5,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "flex-start",
    width: "40%",
    paddingTop: 20,
  },
  titleS: {
    fontSize: "50px",
  },
  textArea: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
  image: {
    width: "50%",
    hight: "50%",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "flex-start",
    width: "40%",
    paddingTop: 20,
    paddingBottom: 20,
  },
  menuTitle: {
    alignItems: "flex-start",
  },
  button: {
    marginBottom: 3,
  },
};
