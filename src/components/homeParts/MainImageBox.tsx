import { Box } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export const MainImageBox = React.memo(({
  mainImages,
}: {
  mainImages: string[];
}) => {
  return (
    <Box sx={styles.carousel}>
      <Slider
        dots={false}
        infinite={true}
        arrows={false}
        slidesToShow={3}
        slidesToScroll={1}
        centerMode
        autoplay
      >
        {mainImages.map((img) => (
          <Box key={img} sx={styles.mainImageBox}>
            <img src={img} alt="" width={"95%"} />
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
