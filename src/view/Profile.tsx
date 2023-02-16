import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import profile from '../images/profile.jpg';
import pomodoro from '../images/pomodoro.jpeg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Profile = React.memo(() => {
  return (
    <>
      <Header title={'Profile'} />
      <Box sx={styles.container}>
        <Box sx={styles.box}>
          {/* <Box sx={styles.imageBox}>
            <Slider dots={false} infinite={true} arrows={false}
              autoplay autoplaySpeed={3000} fade>
              <img src={profile} alt='' />
              <img src={pomodoro} alt='' style={{ height: '500px' }} />
            </Slider>
          </Box> */}
          <Box sx={styles.textBox}>
            <Typography sx={styles.titleFont}>料理研究家・栄養士</Typography>
            <Typography sx={styles.nameFont}>若林 桃子 Momoko Wakabayashi</Typography>
            <Divider style={{ width: '80%' }} />
            <Typography sx={styles.introductionFont}>越谷市出身。大学卒業後により深く料理を学びたいと思い調理師専門学校へ。
              そこで栄養学を学び、卒業後は幼稚園の栄養士として勤務。
              より料理を学ぶ為、都内1つ星フランス料理店で修行しながら、料理家「坂田阿希子」を師事。
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
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: { xs: '100%', sm: '100%' },
    paddingTop: 5,
    paddingBottom: 5,
  },
  box: {
    width: { xs: '100%', md: '1000px' },
    display: 'flex',
    flexDirection: { xs: 'column' as 'column', md: 'row' as 'row' },
    alignItems: { xs: 'center', md: 'space-around' },
    justifyContent: 'space-around',
  },
  imageBox: {
    alignSelf: 'center',
    width: { xs: '50%', md: '350px' },
    objectFit: 'cover'
  },
  textBox: {
    marginTop: { xs: '10px', md: 0 },
    width: { xs: '90%', sm: '60%', md: '400px' },
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
