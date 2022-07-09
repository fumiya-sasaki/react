import { ArrowCircleLeftTwoTone, ArrowCircleRightTwoTone, DoubleArrow, Restaurant } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { RecipeData } from "../../slices/recipe";
import { Carousel } from "react-responsive-carousel";

export const ConnectionBox = React.memo(({
  connection,
}: {
  connection: RecipeData[];
}) => {
  const navigation = useNavigate();
  return (
    <Box sx={styles.newContentBox}>
      <Box sx={styles.titleBox}>
        <Box>
          <Typography sx={{ fontWeight: "bold" }}>
            <Restaurant color={"warning"} />
          </Typography>
        </Box>
        <Typography sx={{ fontWeight: "bold" }}>関連レシピ</Typography>
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
          centerSlidePercentage={30}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <IconButton onClick={onClickHandler} title={label} style={{
                position: 'absolute',
                top: 'calc(80%)',
                left: 0,
              }}>
                <ArrowCircleLeftTwoTone />
              </IconButton>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <IconButton onClick={onClickHandler} title={label} style={{
                position: 'absolute',
                top: 'calc(80%)',
                right: 0,
              }}>
                <ArrowCircleRightTwoTone />
              </IconButton>
            )}>
          {connection.map((item) => (
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

export default ConnectionBox;
const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "space-between",
    justifyContent: "space-between",
  },
  carousel: {
    paddingTop: 2,
  },
  mainImageBox: {
    paddingLeft: 1,
    paddingRight: 1,
  },
  leftContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
  },
  newContentBox: {
    width: "80%",
    marginTop: 5,
  },
  tagContentBox: {
    width: "40%",
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
  imageBox: {
    display: "flex",
    flexDirection: "column" as "column",
    width: "90%",
    paddingTop: 7,
    // paddingBottom: 5,
  },
  imageItemF: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "25%",
    hight: "20%",
  },
  itemImage: {
    width: "100%",
    hight: "100%",
  },
  itemImagePick: {
    width: "30%",
    hight: "30%",
    paddingBottom: "20px",
    paddingTop: "20px",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    width: "23%",
    // paddingLeft: 1,
    // paddingRight: 1,
  },
  itemContainerSason: {
    display: "flex",
    flexDirection: "column" as "column",
    width: "100%",
    paddingLeft: 3,
    paddingRight: 3,
  },
  itemContainerPick: {
    display: "flex",
    flexDirection: "row" as "row",
    width: "90%",
    // borderBottom: '1px solid silver',
    marginBottom: 5,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    width: "100%",
    flexWrap: "wrap",
    // paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentContainerSeason: {
    display: "flex",
    flexDirection: "row" as "row",
    width: "100%",
    paddingTop: 3,
    paddingBottom: 5,
    justifyContent: "space-between",
  },
  titleAndIntr: {
    display: "flex",
    flexDirection: "column" as "column",
    width: "100%",
    flexWrap: "wrap",
    // paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 5,
    justifyContent: "flex-start",
  },
  tagContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    width: "80%",
    justifyContent: "flex-start",
  },
  menuTitleSason: {
    fontWeight: "bold",
    color: "dimgray",
    paddingTop: 1,
    marginBottom: 3,
  },
  menuBox: {
    display: "flex",
    flexDirection: "column" as "column",
    paddingLeft: 5,
  },
  menuTitle: {
    fontWeight: "bold",
    color: "dimgray",
    paddingTop: 1,
  },
  menuTitlePick: {
    fontWeight: "bold",
    color: "dimgray",
    fontSize: "20px",
    paddingLeft: "25px",
  },
  introduction: {
    fontWeight: "lighter",
    color: "dimgray",
    fontSize: "16px",
    paddingLeft: "25px",
    paddingTop: "15px",
  },
  rightContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "30%",
    marginRight: 5,
  },
  serchForm: {
    width: "60%",
    paddingTop: 1,
  },
  tagBox: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingBottom: 1,
  },
  tagItem: {
    margin: 1,
  },
  arrowStyles: {
    position: 'absolute',
    width: 40,
    height: 40,
    zIndex: 2,
    top: 'calc(50% - 15px)'
  }
};
