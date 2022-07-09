import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import RightContent from "./RightParts";

const limit = 9;
export const Gallery = () => {

  const [contents, setContents] = useState<any[]>([]);

  useEffect(() => {
    const businessID = process.env.REACT_APP_BUSINESS_ID;
    const businessToken = process.env.REACT_APP_BUSINESS_TOKEN;
    fetch(`https://graph.facebook.com/v5.0/${businessID}?fields=name%2Cmedia.limit(${limit})%7Bcaption%2Clike_count%2Cmedia_url%2Cpermalink%2Ctimestamp%2Cthumbnail_url%2Cmedia_type%2Cusername%7D&access_token=${businessToken}D`)
      .then(response => response.json())
      .then(data => { setContents(data.media.data) })
  }, []);

  return (
    <>
      <Header title={"Instagram Gallery"} />
      <Box sx={styles.container}>
        <Box sx={styles.leftContainer}>
          <Box sx={styles.contentContainer}>
            {contents.map((content) => (
              <Box key={content.id} style={styles.itemContainer}>
                <a href={content.permalink} target="qoo_insta">
                  <img src={content.media_url} alt="" style={styles.image} />
                </a>
              </Box>
            ))}
          </Box>
        </Box>
        <RightContent />
      </Box>
      <Footer />
    </>
  );
};

export default Gallery;
const styles = {
  container: {
    display: "flex",
    flexDirection: "row" as "row",
    // alignItems: "center",
    justifyContent: "space-between",
  },
  leftContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    paddingTop: 5,
    paddingBottom: 5,
  },
  image: {
    width: "100%",
    hight: "100%",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    flexWrap: "wrap",
    width: "90%",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingRight: 20,
    paddingTop: 17,
    width: "30%",
  },
  rightContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "30%",
    marginRight: 5,
  },
};
