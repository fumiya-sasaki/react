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
          <Box key={item.uid} style={{ borderBottom: 1, width: "100%" }} >
            <Link to={"/content/"} state={{ recipeData: item }} style={styles.itemContainerPick} >
              <img src={item.mainImageUrl} alt="" style={styles.itemImagePick} />
              <Box sx={styles.titleAndIntr}>
                <Typography sx={styles.menuTitlePick}>{item.title}</Typography>
                <Typography sx={styles.introduction}>{item.introduction}</Typography>
              </Box>
            </Link>
            <hr style={{ width: "90%" }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
});

export default PickUpBox;
const styles = {
  newContentBox: {
    width: "80%",
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
    width: "30%",
    hight: "30%",
    paddingBottom: "20px",
    paddingTop: "20px",
  },
  itemContainerPick: {
    display: "flex",
    flexDirection: "row" as "row",
    width: "90%",
    borderBottom: 1,
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
  font: {
    fontStyle: "italic",
    color: "dimgray",
    fontWeight: "bold"
  },
};
