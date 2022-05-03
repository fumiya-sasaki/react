import { Box, Button, Typography } from "@mui/material";
import {
  collection,
  DocumentData,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "./core/Firebase";

export const Home = () => {
  type Content = {
    imageUrls: string[];
    text: string;
    title: string;
  };

  type Data = {
    id: number;
    createdAt: Timestamp;
    title: string;
    contents: Content[];
  };

  const [contents, setContents] = useState<Data[]>([]);
  // useEffect(() => {

  // },[]);
  const getColecction = async () => {
    const getDoc = await getDocs(collection(db, "recipes"));
    let data = [];
    getDoc.forEach((doc) => {
      const collection = doc.data();
      const result: Data = {
        id: collection.id,
        createdAt: collection.createdAt,
        title: collection.title,
        contents: collection.contents,
      };
      const newContents = [...contents];
      setContents([...contents, result]);
    });
  };
  return (
    <Box className="App">
      <Button onClick={getColecction}>get</Button>
      {contents.map((item) => (
        <Box key={item.id}>
          <Typography>{item.id}</Typography>
          <Typography>{item.title}</Typography>
          {item.contents.map((content, index) => (
            <Box key={index}>
              <Typography>{content.text}</Typography>
              <Typography>{content.title}</Typography>
              <Typography>{content.imageUrls[0]}</Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default Home;
