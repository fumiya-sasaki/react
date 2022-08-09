import { Box, Typography } from "@mui/material";
import instagram from '../images/instagram.png';

export const Footer = () => {
  return (
    <Box style={styles.container}>
      <a target='_blank' href='https://www.instagram.com/chiacchiere1/'><img src={instagram} alt='' width={'50px'} /></a>
      <Typography style={styles.title}>
        copyrights© chiacchiere. All Rights Reserved.
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
    paddingTop: 10,
    paddingBottom: 40,
    paddingLeft: 40,
    paddingRight: 40,
    background: "#2b2b2b",
    width: "auto",
  },
  title: {
    fontSize: "15px",
    color: "#fffffc",
  },
  image: {
    width: "100px",
    hight: "100px",
  },
};
