import { Box, Button, Typography } from "@mui/material";
import { useSize } from "../../../hooks";
import { Content } from "../../../slices/recipe";

type PreviewState = {
  title: string;
  introduction: string;
  recipeContents: Content[];
  mainImageUrl: string;
  deleteContentImg: (index: number, imgIndex: number) => void;
};

export const Preview: React.FC<PreviewState> = ({
  title,
  introduction,
  recipeContents,
  mainImageUrl,
  deleteContentImg,
}) => {
  const { isMobileSize } = useSize();
  return (
    <Box style={styles.container}>
      <Typography style={styles.title}>{title}</Typography>
      <Typography style={styles.title}>{introduction}</Typography>
      <img src={mainImageUrl} alt="" style={{
        width: isMobileSize ? '100%' : '75%',
        height: '100%',
        objectFit: 'cover',
      }} />
      <Box>
        {recipeContents.map((recipe, index) => (
          <Box key={index}>
            <Typography sx={styles.contentsTitle}>{recipe.title}</Typography>
            {recipe.imageUrls.map((url, imgIndex) => (
              <Box key={imgIndex}>
                <img src={url} alt="" style={{
                  width: isMobileSize ? '70%' : '60%',
                  // height: isMobileSize ? '160px' : '250px',
                  paddingBottom: '2%',
                  objectFit: 'cover',
                }} />
                {url !== "" &&
                  <Button onClick={() => deleteContentImg(index, imgIndex)}>画像削除</Button>
                }
              </Box>
            ))}
            <Typography sx={styles.text}>{recipe.text}</Typography>
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
  text: {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
  contentsTitle: {
    marginTop: 3,
    paddingBottom: 3,
  },
};
