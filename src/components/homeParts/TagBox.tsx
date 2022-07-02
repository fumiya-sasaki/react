import { DoubleArrow, EmojiFlags, Restaurant } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { RecipeData } from "../../slices/recipe";

export const TagBox = React.memo(({
  pickUpIngredients,
  serch,
}: {
  pickUpIngredients: string[];
  serch: (value: string) => void;
}) => {
  return (
    <Box sx={styles.tagContainer}>
      <Box sx={styles.tagContentBox}>
        <Box sx={styles.titleBox}>
          <Box>
            <Typography sx={{ fontWeight: "bold" }}>
              <EmojiFlags color={"warning"} />
            </Typography>
          </Box>
          <Typography sx={{ fontWeight: "bold" }}>旬の食材</Typography>
        </Box>
        <Box sx={styles.tagBox}>
          {pickUpIngredients.map((item) => (
            <Box key={item} sx={styles.tagItem}>
              <Button
                variant="outlined"
                color={"warning"}
                onClick={() => serch(item)}
              >
                {item}
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
});

export default TagBox;
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
