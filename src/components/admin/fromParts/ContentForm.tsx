import { Box, Button, TextareaAutosize, TextField } from "@mui/material";
import React from "react";
import { Content } from "../../../slices/recipe";

type ContentFormState = {
  recipeContents: Content[];
  onChangeTitle: (value: string, index: number) => void;
  onChangeText: (value: string, index: number) => void;
  onChangeContentImage: (e: any, index: number) => void;
  deleteForm: (index: number) => void;
  disabled: boolean;
};

export const ContentForm: React.FC<ContentFormState> = React.memo(({
  recipeContents,
  onChangeTitle,
  onChangeText,
  onChangeContentImage,
  deleteForm,
  disabled,
}) => {
  return (
    <>
      {recipeContents.map((content, index) => (
        <Box key={index} style={styles.container}>
          <TextField
            label='タイトル'
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
          <Button variant="contained" sx={styles.button} component="label" disabled={disabled}>
            画像追加
            <input
              type="file"
              hidden
              onChange={(e) => onChangeContentImage(e, index)}
            />
          </Button>
          <Button variant="contained" onClick={() => deleteForm(index)} disabled={disabled}>
            削除
          </Button>
        </Box>
      ))}
    </>
  );
});

export default ContentForm;
const styles = {
  title: {
    fontSize: "20px",
    marginTop: 30,
    marginBottom: 30,
  },
  textArea: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "flex-start",
    width: "90%",
    paddingTop: 20,
    paddingBottom: 20,
  },
  button: {
    marginBottom: 3,
  },
};
