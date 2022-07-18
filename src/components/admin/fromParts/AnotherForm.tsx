import { Box, Button, TextareaAutosize, TextField } from "@mui/material";

type AnotherForm = {
  tags: string;
  category: string;
  season: string;
  setTags: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setSeason: React.Dispatch<React.SetStateAction<string>>;
};

export const AnotherForm: React.FC<AnotherForm> = ({
  tags,
  category,
  season,
  setTags,
  setCategory,
  setSeason
}) => {
  return (
    <Box style={styles.contentContainer}>
      <TextField
        label="旬"
        value={season}
        variant="filled"
        fullWidth
        style={styles.category}
        onChange={(e) => setSeason(e.target.value)}
      />
      <TextField
        label="カテゴリー"
        value={category}
        variant="filled"
        fullWidth
        style={styles.category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <TextareaAutosize
        minRows={10}
        style={styles.textArea}
        onChange={(e) => setTags(e.target.value)}
        placeholder="タグ"
        value={tags}
      />
    </Box>
  );
};

export default AnotherForm;
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
