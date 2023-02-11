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

  return (
    <Box sx={styles.carousel}>
      <Slider
        dots={false}
        infinite={true}
        arrows={false}
        slidesToShow={isMobileSize ? 2 : 3}
        slidesToScroll={1}
        centerMode
        autoplay
        autoplaySpeed={2000}
      >
        {mainImages.map((img) => (
          <Box key={img} sx={styles.mainImageBox}>
            <img src={img} alt="" style={{
              width: '96%',
              height: isMobileSize ? '130px' : '240px',
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
    pointerEvents: 'none'
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
