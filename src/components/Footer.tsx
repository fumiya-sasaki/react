import { Box, Button, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box style={styles.container}>
      <Typography style={styles.title}>
        copyrights© ももこごはん. All Rights Reserved.
      </Typography>
      <Typography style={styles.title}>
        当サイト内の文章・画像等の無断転載及び複製などの行為はご遠慮ください。
      </Typography>
    </Box>
  );
};

export default Footer;
const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    // paddingBottom:15,
    // paddingTop:15,
    background: "#2b2b2b",
    width: "100%",
  },
  title: {
    fontSize: "15px",
    color: "#fffffc",
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
