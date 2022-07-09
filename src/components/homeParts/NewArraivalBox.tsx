import { DoubleArrow } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { RecipeData } from "../../slices/recipe";
import restaurant from "../../images/restaurant.png";

export const NewArrivalBox = React.memo(({
  contents,
}: {
  contents: RecipeData[];
}) => {
  const navigation = useNavigate();
  return (
    <Box sx={styles.newContentBox}>
      <Box sx={styles.titleBox}>
        <img src={restaurant} alt="" width={"50px"} />
        <Typography sx={styles.font}>新着レシピ</Typography>
      </Box>
      <Box sx={styles.contentContainer}>
        {contents.map((item) => (
          <Box key={item.uid} style={styles.itemContainer}>
            <img src={item.mainImageUrl} alt="" style={styles.itemImage} />
            <Link to={"/content/"} state={{ recipeData: item }}>
              <Typography sx={styles.menuTitle}>{item.title}</Typography>
            </Link>
          </Box>
        ))}
      </Box>
      <Box style={{ position: "relative" }}>
        <Button onClick={() => navigation("newArrival")} style={{
          position: "absolute",
          right: 0,
        }}><>新着レシピをもっと見る<DoubleArrow /></></Button>
      </Box>
    </Box>
  );
});

export default NewArrivalBox;
const styles = {
  font: {
    fontStyle: "italic",
    color: "dimgray",
    fontWeight: "bold"
  },
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
  itemImage: {
    width: "100%",
    hight: "100%",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    width: "32%",
    alignItems: "flex-start",
    paddingBottom: 2,
    // paddingLeft: 1,
    // paddingRight: 1,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    width: "100%",
    flexWrap: "wrap",
    // paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 3,
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuTitle: {
    width: "150px",
    fontWeight: "bold",
    color: "dimgray",
    paddingTop: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
};
