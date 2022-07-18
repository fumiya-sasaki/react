import { ArrowCircleLeftTwoTone, ArrowCircleRightTwoTone, DoubleArrow, Restaurant } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { RecipeData } from "../../slices/recipe";
import { Carousel } from "react-responsive-carousel";
import peach from "../../images/peach.png";
import { useSize } from "../../hooks";

export const ConnectionBox = React.memo(({
  connection,
}: {
  connection: RecipeData[];
}) => {
  const { isMobileSize } = useSize();
  return (
    <Box sx={styles.newContentBox}>
      <Box sx={styles.titleBox}>
        <Typography sx={styles.font}>関連レシピ</Typography>
      </Box>
      <Box sx={styles.contentContainerSeason}>
        <Carousel
          showThumbs={false}
          swipeable={true}
          autoPlay={true}
          infiniteLoop={true}
          emulateTouch={true}
          centerMode={true}
          showStatus={false}
          centerSlidePercentage={40}
        >
          {connection.map((item) => (
            <Box key={item.uid} style={styles.itemContainerSason}>
              <img src={item.mainImageUrl} alt="" style={{
                height: isMobileSize ? '100px' : '150px',
                objectFit: 'cover',
              }} />
              <Link to={"/content/"} state={{ recipeData: item }} style={{ marginBottom: '50px' }}>
                <Typography sx={styles.menuTitleSason}>{item.title}</Typography>
              </Link>
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
});

export default ConnectionBox;
const styles = {
  carousel: {
    paddingTop: 2,
  },
  newContentBox: {
    width: "100%",
    marginTop: 5,
    overFlowX: 'hidden',
  },
  titleBox: {
    padding: 1,
    bgcolor: '#f3f3f2',
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainerSason: {
    display: "flex",
    flexDirection: "column" as "column",
    width: "100%",
    paddingLeft: 3,
    paddingRight: 3,
  },
  contentContainerSeason: {
    display: "flex",
    flexDirection: "row" as "row",
    width: "100%",
    paddingTop: 3,
    paddingBottom: 5,
    justifyContent: "flex-start",
  },
  menuTitleSason: {
    fontWeight: "bold",
    color: "dimgray",
    paddingTop: 1,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    overflow: 'hidden',
  },
  font: {
    fontStyle: "italic",
    color: "dimgray",
    fontWeight: "bold"
  },
};
