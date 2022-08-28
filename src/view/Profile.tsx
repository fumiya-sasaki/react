import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import main from '../images/main.jpg';
import pomodoro from '../images/pomodoro.jpeg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Profile = React.memo(() => {
  return (
    <>
      <Header title={"Profile"} />
      <Box sx={styles.container}>
        <Box sx={styles.box}>
          <Box sx={styles.imageBox}>
            <Slider
              dots={false}
              infinite={true}
              arrows={false}
              autoplay
              autoplaySpeed={3000}
              fade
            // speed={10000}
            >
              <img src={main} alt='' style={{ height: '500px' }} />
              <img src={pomodoro} alt='' style={{ height: '500px' }} />
            </Slider>
          </Box>
          <Box sx={styles.textBox}>
            <Typography sx={styles.titleFont}>料理家・栄養士</Typography>
            <Typography sx={styles.nameFont}>若林 ももこ Momoko Wakabayashi</Typography>
            <Divider style={{ width: '80%' }} />
            <Typography sx={styles.introductionFont}>大学卒業後により深く料理を学びたいと思い調理師専門学校へ。<br />
              そこで栄養学を学び、卒業後は幼稚園の栄養士として勤務。<br />
              より料理を学ぶ為、都内1つ星フランス料理店で修行しながら、<br />料理家のアシスタントとして勤務。<br />
              「気合をいれずに気軽に作れる」<br />
              「いつもの食卓に変化を」<br />
              「体にやさしい、毎日食べたい」<br />
              「料理が楽しくなる」<br />
              「普段作らない料理もみじかな料理に」<br />
              をモットーに、みじかな食材を使った作りやすいレシピにこだわり、
              いつもの食卓に変化や彩りが増えるような料理/<br />楽しく食事ができる料理/を提案している。
            </Typography>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
});

export default Profile;
const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    width: { xs: '100%', sm: "100%" },
    paddingTop: 5,
    paddingBottom: 5,
  },
  box: {
    width: { xs: '100%', md: '1000px' },
    display: "flex",
    flexDirection: { xs: 'column' as 'column', md: "row" as "row" },
    alignItems: { xs: 'center', md: "space-around" },
    justifyContent: "space-around",
  },
  imageBox: {
    width: { xs: '95%', md: '400px' },

  },
  textBox: {
    width: { xs: '95%', md: '480px' },
  },
  titleFont: {
    fontFamily: 'Georgia',
    color: 'dimgray',
    fontWeight: 'bold',
    fontSize: 15,
  },
  nameFont: {
    fontFamily: 'Georgia',
    color: 'dimgray',
    fontWeight: 'bold',
    fontSize: 17,
  },
  introductionFont: {
    fontFamily: 'Georgia',
    color: 'dimgray',
    fontWeight: 'bold',
    marginTop: 3,
  },
};
