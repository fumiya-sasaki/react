import { Box, Button, Typography } from "@mui/material";

export const Header = () => {

  return (
    <Box style={styles.container}>
      <Typography style={styles.titleS}>ももこごはん</Typography>
      <Button>ホーム</Button>
      <Button>レシピ検索</Button>
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
    paddingBottom:15,
    paddingTop:15,
  },
  titleS: {
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
