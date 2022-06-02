import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch } from "../hooks";
import { getData, serchCategory } from "../slices/recipe";

export const Header = () => {
  const dispatch = useAppDispatch();

  const goHome = () => {
    dispatch(getData());
  };

  const serch = () => {
    dispatch(serchCategory({ category: "春料理" }));
  };

  return (
    <Box style={styles.container}>
      <Typography style={styles.title}>ももこごはん</Typography>
      <Button onClick={goHome}>ホーム</Button>
      <Button onClick={serch}>レシピ検索</Button>
      <Button>活動実績</Button>
      <Button>お仕事依頼</Button>
    </Box>
  );
};

export default Header;
const styles = {
  container: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 15,
    paddingTop: 15,
  },
  title: {
    fontSize: "30px",
  },
  image: {
    width: "100px",
    hight: "100px",
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
