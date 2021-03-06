import { Backdrop, Box, Button, CircularProgress, FormControlLabel, Switch } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setData } from '../../slices/admin';
import { Config, getConfig, setRecipeUids } from '../../slices/config';
import { Content, RecipeData, SubmitRecipe } from '../../slices/recipe';
import { RootState } from '../../slices/store';
import AnotherForm from './fromParts/AnotherForm';
import ContentForm from './fromParts/ContentForm';
import Preview from './fromParts/Preview';
import TopForm from './fromParts/TopForm';

export const Article = () => {
  const location = useLocation();
  type RecipeState = {
    recipeData: RecipeData;
  };

  const { recipeData } = location.state as RecipeState;
  const config: Config = useAppSelector((state: RootState) => state.config);
  const [title, setTitle] = useState<string>(!recipeData.newArticle ? recipeData.title : '');
  const [introduction, setIntroduction] = useState<string>(!recipeData.newArticle ? recipeData.introduction : '');
  const [mainImageUrl, setMainImage] = useState<string>(!recipeData.newArticle ? recipeData.mainImageUrl : '');
  const [category, setCategory] = useState<string>(!recipeData.newArticle ? recipeData.category : '');
  const [season, setSeason] = useState<string>(!recipeData.newArticle ? recipeData.season : '');
  const [tags, setTags] = useState<string>(!recipeData.newArticle ? '#' + recipeData.tags.join('#') : '');
  const [recipeContents, setRecipeContents] = useState<Content[]>(!recipeData.newArticle ? recipeData.contents
    : [{ imageUrls: [], text: '', title: '', },]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    dispatch(getConfig());
  }, [dispatch]);

  useEffect(() => {
    if (!recipeData.newArticle
      && config.recipeUids.includes(recipeData.uid)) setIsCheck(true);
  }, [config.recipeUids, recipeData.newArticle, recipeData.uid]);

  const submitRecipeData = async () => {
    setIsLoading(true);
    setDisabled(true);
    const newTags: string[] = tags.split('#').filter((item) => item !== '');
    const newRecipeData: SubmitRecipe = {
      uid: !recipeData.newArticle ? recipeData.uid : 0,
      title,
      mainImageUrl,
      introduction,
      contents: recipeContents,
      category,
      tags: newTags,
      season,
    };
    await dispatch(setData(newRecipeData));
    setIsLoading(false);
    setDisabled(false);
    navigation('/admin/home');
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
      text: '',
      title: '',
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

  const setPickUpUid = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRecipeUids({ recipeUid: recipeData.uid }));
    setIsCheck(event.target.checked);
  };

  return (
    <Box sx={styles.containerWrap}>
      <Backdrop open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Box sx={styles.container}>
        <TopForm
          title={title}
          introduction={introduction}
          mainImageUrl={mainImageUrl}
          setTitle={setTitle}
          setIntroduction={setIntroduction}
          setMainImage={setMainImage}
          disabled={disabled}
        />
        <ContentForm
          recipeContents={recipeContents}
          onChangeTitle={onChangeTitle}
          onChangeText={onChangeText}
          onChangeContentImage={onChangeContentImage}
          deleteForm={deleteForm}
          disabled={disabled}
        />
        <Button variant='contained' sx={styles.button} onClick={addForm} disabled={disabled}>
          ??????
        </Button>
        <AnotherForm
          category={category}
          setCategory={setCategory}
          tags={tags}
          setTags={setTags}
          season={season}
          setSeason={setSeason}
        />
        {recipeData.uid !== 0 &&
          <FormControlLabel checked={isCheck} control={<Switch onChange={setPickUpUid} />} label='????????????' />
        }
        <Button variant='contained' onClick={submitRecipeData} disabled={disabled}>???????????????</Button>
      </Box>
      <Box sx={styles.previewBox}>
        <Preview
          title={title}
          introduction={introduction}
          recipeContents={recipeContents}
          mainImageUrl={mainImageUrl}
          deleteContentImg={deleteContentImg}
        />
      </Box>
    </Box>
  );
};

export default Article;
const styles = {
  containerWrap: {
    display: 'flex',
    flexDirection: { xs: 'column' as 'column', sm: 'row' as 'row' },
    alignItems: 'space-between',
    justifyContent: 'space-between',
  },
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: { xs: 1, sm: 5 },
    width: { xs: '100%', sm: '45%' },
  },
  button: {
    marginBottom: 3,
  },
  previewBox: {
    width: { xs: '100%', sm: '45%' },
    paddingRight: { xs: 1, sm: 5 },
  }
};
