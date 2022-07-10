import { Box, Typography } from "@mui/material";
import { Link, } from "react-router-dom";
import React from "react";
import { RecipeData } from "../../slices/recipe";
import peach from "../../images/peach.png";

export const PickUpBox = React.memo(({
  pickUp,
}: {
  pickUp: RecipeData[];
}) => {
  return (
    <Box sx={styles.newContentBox}>
      <Box sx={styles.titleBox}>
        <img src={peach} alt="" width={"50px"} />
        <Typography sx={styles.font}>おすすめレシピ</Typography>
      </Box>
      <Box sx={styles.contentContainer}>
        {pickUp.map((item) => (
          <Link key={item.uid} to={"/content/"} state={{ recipeData: item }} style={{ width: '100%' }}>
            <Box sx={styles.itemContainerPick} >
              <img src={item.mainImageUrl} alt=""
                style={{
                  width: 'auto',
                  height: 150,
                  paddingBottom: "20px",
                  paddingTop: "20px",
                  objectFit: 'cover'
                }} />
              <Box sx={styles.titleAndIntr}>
                <Typography sx={styles.menuTitlePick}>{item.title}</Typography>
                <Typography sx={styles.introduction}>{item.introduction}</Typography>
              </Box>
            </Box>
            <hr style={{ width: '98%' }} />
          </Link>
        ))}
      </Box>
    </Box>
  );
});

export default PickUpBox;
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
  itemImagePick: {
    paddingBottom: "20px",
    paddingTop: "20px",
    objectFit: 'cover',
  },
  itemContainerPick: {
    display: "flex",
    flexDirection: { xs: 'column' as 'column', md: "row" as "row" },
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    width: "100%",
    paddingTop: 3,
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleAndIntr: {
    height: { xs: 'auto', md: 150 },
    paddingTop: { xs: '10px', md: '20px' },
    paddingBottom: { xs: '20px', md: '10px' },
  },
  menuTitlePick: {
    fontWeight: "bold",
    color: "dimgray",
    fontSize: "20px",
    paddingLeft: { xs: 0, md: '25px' },
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
  },
  introduction: {
    fontWeight: "lighter",
    color: "dimgray",
    fontSize: "16px",
    paddingLeft: { xs: 0, md: '25px' },
    paddingTop: "15px",
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 4,
    overflow: 'hidden',
  },
  font: {
    fontStyle: "italic",
    color: "dimgray",
    fontWeight: "bold"
  },
};
