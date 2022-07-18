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
        width: isMobileSize ? '250px' : '400px',
        height: isMobileSize ? '200px' : '320px',
        objectFit: 'cover',
      }} />
      <Box>
        {recipeContents.map((recipe, index) => (
          <Box key={index}>
            <Typography sx={styles.introduction}>{recipe.title}</Typography>
            {recipe.imageUrls.map((url, imgIndex) => (
              <Box key={imgIndex}>
                <img src={url} alt="" style={{
                  width: isMobileSize ? '200px' : '300px',
                  height: isMobileSize ? '160px' : '250px',
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
    width: '70%',
  },
  introduction: {
    width: { xs: '100%', sm: '45%' },
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    marginTop: 3,
    paddingBottom: 3,
  },
};
