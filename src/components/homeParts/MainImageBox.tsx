import { Box } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSize } from "../../hooks";
export const MainImageBox = React.memo(({
  mainImages,
}: {
  mainImages: string[];
}) => {
  const { isMobileSize } = useSize();
  const width: string = isMobileSize ? '150px' : '290px';
  const height: string = isMobileSize ? '130px' : '240px';
  const slidesToShow: number = isMobileSize ? 2 : 3;

  return (
    <Box sx={styles.carousel}>
      <Slider
        dots={false}
        infinite={true}
        arrows={false}
        slidesToShow={slidesToShow}
        slidesToScroll={1}
        centerMode
        autoplay
      >
        {mainImages.map((img) => (
          <Box key={img} sx={styles.mainImageBox}>
            <img src={img} alt="" style={{
              width,
              height,
              objectFit: 'cover',
            }} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
});

export default MainImageBox;
const styles = {
  carousel: {
    paddingTop: 2,
    width: "100%",
  },
  mainImageBox: {
    paddingLeft: 1,
    paddingRight: 1,
    // width: { xs: "30%", lg: '250px' }
  },
  carouselBox: {
    display: "flex",
    flexDirection: "row" as "row",
  }
};
