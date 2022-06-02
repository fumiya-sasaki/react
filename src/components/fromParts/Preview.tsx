import { Box, Typography } from "@mui/material";
import { Content } from "../../slices/recipe";

type Preview = {
  title: string;
  introduction: string;
  recipeContents: Content[];
  mainImageUrl: string;
};

export const Preview: React.FC<Preview> = ({
  title,
  introduction,
  recipeContents,
  mainImageUrl,
}) => {
  return (
    <Box style={styles.container}>
      <Typography style={styles.title}>{title}</Typography>
      <Typography style={styles.title}>{introduction}</Typography>
      <img src={mainImageUrl} alt="" style={styles.image} />
      <Box>
        {recipeContents.map((recipe, index) => (
          <Box key={index}>
            <Typography style={styles.contentTitle}>{recipe.title}</Typography>
            {recipe.imageUrls.map((url, index) => (
              <Box key={index}>
                <img src={url} alt="" style={styles.contentImage} />
              </Box>
            ))}
            <Typography>{recipe.text}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Preview;
const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "20px",
    marginTop: 30,
    marginBottom: 30,
  },
  contentTitle: {
    marginTop: 20,
  },
  image: {
    width: "50%",
    hight: "50%",
  },
  contentImage: {
    width: "300px",
    hight: "300px",
  },
};
