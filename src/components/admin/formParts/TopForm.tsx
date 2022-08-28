import { Box, Button, TextareaAutosize, TextField } from "@mui/material";
import React from "react";

export const TopForm = React.memo(({
  title,
  introduction,
  setTitle,
  setIntroduction,
  setMainImage,
  disabled,
}: {
  title: string;
  introduction: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setIntroduction: React.Dispatch<React.SetStateAction<string>>;
  setMainImage: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
}) => {
  const onChangeMainImage = (e: any) => {
    if (e.target.files[0]) {
      setMainImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Box style={styles.contentContainer}>
      <TextField
        label="タイトル"
        value={title}
        variant="filled"
        fullWidth
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextareaAutosize
        minRows={10}
        style={styles.textArea}
        onChange={(e) => setIntroduction(e.target.value)}
        placeholder="レシピの説明文"
        value={introduction}
      />
      <Button variant="contained" component="label" disabled={disabled}>
        main画像をアップロード
        <input type="file" hidden onChange={(e) => onChangeMainImage(e)} />
      </Button>
    </Box>
  );
});

export default TopForm;
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
    width: "90%",
    paddingTop: 20,
  },
  category: {
    marginBottom: 20,
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
