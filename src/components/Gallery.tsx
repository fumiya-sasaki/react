import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

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
        <Box sx={styles.box}>
          <Box sx={styles.contentContainer}>
            {contents.map((content) => (
              <Box key={content.id} sx={styles.itemContainer}>
                <a href={content.permalink} target="qoo_insta">
                  <img src={content.media_url} alt="" style={styles.image} />
                </a>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Gallery;
const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 2,
  },
  box: {
    width: { xs: '100%', md: '1000px' },
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
  },
  image: {
    width: "100%",
    hight: "100%",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    gap: 2,
    paddingTop: 2,
    flexWrap: "wrap",
    width: '98%',
    marginLeft: { xs: '2%', sm: 0 }
  },
  itemContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    width: "30%",
  },
};
