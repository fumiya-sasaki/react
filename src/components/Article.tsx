import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import {
  Content,
  RecipeData,
  setData,
  SubmitRecipe,
} from "../slices/recipe";
import AnotherForm from "./fromParts/AnotherForm";
import ContentForm from "./fromParts/ContentForm";
import Preview from "./fromParts/Preview";
import TopForm from "./fromParts/TopForm";

export const Article = () => {
  const location = useLocation();
  type RecipeState = {
    recipeData: RecipeData;
  };

  const { recipeData } = location.state as RecipeState;
  const [title, setTitle] = useState<string>(!recipeData.newArticle ? recipeData.title : "");
  const [introduction, setIntroduction] = useState<string>(!recipeData.newArticle ? recipeData.introduction : "");
  const [mainImageUrl, setMainImage] = useState<string>(!recipeData.newArticle ? recipeData.mainImageUrl : "");
  const [category, setCategory] = useState<string>(!recipeData.newArticle ? recipeData.category : "");
  const [tags, setTags] = useState<string>(!recipeData.newArticle ? "#" + recipeData.tags.join("#") : "");
  const [recipeContents, setRecipeContents] = useState<Content[]>(!recipeData.newArticle ? recipeData.contents
    : [{ imageUrls: [], text: "", title: "", },]);

  const dispatch = useAppDispatch();

  const submitRecipeData = () => {
    const newTags: string[] = tags.split("#");
    const newRecipeData: SubmitRecipe = {
      id: !recipeData.newArticle ? recipeData.id : 0,
      title,
      mainImageUrl,
      introduction,
      contents: recipeContents,
      category,
      tags: newTags,
    };
    dispatch(setData(newRecipeData));
  };

  const onChangeContentImage = async (e: any, index: number) => {
    if (e.target.files[0]) {
      const newRecipeContents: Content[] = [...recipeContents];
      newRecipeContents[index].imageUrls.push(URL.createObjectURL(e.target.files[0]));
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
    setRecipeContents(newRecipeContents);
  };

  const deleteContentImg = (index: number, imgIndex: number) => {
    const newRecipeContents: Content[] = [...recipeContents];
    newRecipeContents[index].imageUrls = recipeContents[index].imageUrls.splice(imgIndex + 1, 1);
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
        <AnotherForm
          category={category}
          setCategory={setCategory}
          tags={tags}
          setTags={setTags}
        />
        <Button variant="contained" onClick={submitRecipeData}>レシピ追加</Button>
      </Box>
      <Preview
        title={title}
        introduction={introduction}
        recipeContents={recipeContents}
        mainImageUrl={mainImageUrl}
        deleteContentImg={deleteContentImg}
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
