import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks";
import { Content, getData, setData, SubmitRecipe } from "../slices/recipe";
import ContentForm from "./fromParts/ContentForm";
import Preview from "./fromParts/Preview";
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
    <Box sx={styles.containerWrap}>
      <Box sx={styles.container}>
        <TopForm
          title={title}
          introduction={introduction}
          mainImageUrl={mainImageUrl}
          setTitle={setTitle}
          setIntroduction={setIntroduction}
          setMainImage={setMainImage}
        />
        <ContentForm
          recipeContents={recipeContents}
          onChangeTitle={onChangeTitle}
          onChangeText={onChangeText}
          onChangeContentImage={onChangeContentImage}
          deleteForm={deleteForm}
        />
        <Button variant="contained" sx={styles.button} onClick={addForm}>
          追加
        </Button>
        <Button variant="contained" onClick={setRecipeData}>
          レシピ追加
        </Button>
      </Box>
      <Preview
        title={title}
        introduction={introduction}
        recipeContents={recipeContents}
        mainImageUrl={mainImageUrl}
      />
    </Box>
  );
};

export default Article;
const styles = {
  containerWrap: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "flex-start",
    // justifyContent: "center",
    // paddingLeft: 5,
  },
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: 5,
    width: "50%",
  },
  button: {
    marginBottom: 3,
  },
};
