import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import instagram from '../images/instagram.png';

export const Footer = React.memo(() => {
  const navigation = useNavigate();
  return (
    <Box sx={styles.container}>
      <a target='_blank' href='https://www.instagram.com/momoko_wakabayashi/'><img src={instagram} alt='' width={'50px'} /></a>
      <Button onClick={() => navigation('/inquiry')} sx={styles.font}>お問い合わせ</Button>
      <Typography sx={styles.title}>
        copyrights© chiacchiere. All Rights Reserved.
      </Typography>
      <Typography sx={styles.title}>
        当サイト内の文章・画像等の無断転載及び複製などの行為はご遠慮ください。
      </Typography>
    </Box>
  );
});

export default Footer;
const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 1,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
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
  font: {
    fontFamily: 'Georgia',
    color: 'dimgray',
    fontWeight: 'bold',
    '&:hover': {
      bgcolor: 'unset'
    },
    paddingRight: 1,
  },
};
