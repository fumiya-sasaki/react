import { Restaurant } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { RecipeData } from "../../slices/recipe";
import { Carousel } from "react-responsive-carousel";

export const SeasonBox = React.memo(({
  season,
}: {
  season: RecipeData[];
}) => {
  return (
    <Box sx={styles.newContentBox}>
      <Box sx={styles.titleBox}>
        <Box>
          <Typography sx={{ fontWeight: "bold" }}>
            <Restaurant color={"warning"} />
          </Typography>
        </Box>
        <Typography sx={{ fontWeight: "bold" }}>季節のレシピ</Typography>
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

        // renderArrowPrev={(onClickHandler, hasPrev, label) =>
        //   hasPrev && (
        //     <IconButton onClick={onClickHandler} title={label} style={{
        //       position: 'absolute',
        //       top: 190,
        //       left: 0,
        //     }}>
        //       <ArrowCircleLeftTwoTone />
        //     </IconButton>
        //   )
        // }
        // renderArrowNext={(onClickHandler, hasNext, label) =>
        //   hasNext && (
        //     <IconButton onClick={onClickHandler} title={label} style={{
        //       position: 'absolute',
        //       top: 170,
        //       right: 0,
        //     }}>
        //       <ArrowCircleRightTwoTone />
        //     </IconButton>
        //   )}
        >
          {season.map((item) => (
            <Box key={item.uid} style={styles.itemContainerSason}>
              <img src={item.mainImageUrl} alt="" />
              <Link to={"/content/"} state={{ recipeData: item }}>
                <Typography sx={styles.menuTitleSason}>{item.title}</Typography>
              </Link>
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
});

export default SeasonBox;
const styles = {
  newContentBox: {
    width: { xs: '95%', sm: "80%" },
    marginTop: 5,
  },
  titleBox: {
    padding: 1,
    bgcolor: "#fdeff2",
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
    paddingBottom: 3,
    justifyContent: "space-between",
  },
  menuTitleSason: {
    fontWeight: "bold",
    color: "dimgray",
    paddingTop: 1,
    marginBottom: 5,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    overflow: 'hidden',
  },
};
