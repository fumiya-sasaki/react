import { Box, Button, Pagination, TextareaAutosize, TextField, Typography } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RecipeData } from "../slices/recipe";
import { RootState } from "../slices/store";
import Header from "./Header";
import Footer from "./Footer";
import { getRecipeData } from "../slices/screen/homeScreen";
import { init, send } from "emailjs-com";
import RightContent from "./RightContent";

export const Inquiry = () => {

  const dispatch = useAppDispatch();
  const recipe: RecipeData[] = useAppSelector(
    (state: RootState) => state.recipe
  );
  const screen: RecipeData[] = useAppSelector(
    (state: RootState) => state.homeScreen
  );

  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [fromName, setFromName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const onSubmit = async () => {
    // フォームのデフォルトの動作をキャンセル
    // e.preventDefault()

    // 必要なIDをそれぞれ環境変数から取得
    const userID = process.env.REACT_APP_USER_ID;
    const serviceID = process.env.REACT_APP_SERVICE_ID;
    const templateID = process.env.REACT_APP_TEMPLATE_ID;

    if (userID && serviceID && templateID) {
      // emailJS初期化
      init(userID)

      // emailJS送信データを定義
      const params = {
        fromName,
        email,
        title,
        message,
        phoneNumber,
      }

      // emailJS送信
      try {
        await send(serviceID, templateID, params)
        alert('送信成功')
      } catch (error) {
        // 送信失敗したらalertで表示
        console.log(error)
      }
    }
  }

  return (
    <>
      <Header title={"お問い合わせ"} />
      <Box sx={styles.container}>
        <Box sx={styles.leftContainer}>
          <TextField
            label="お名前（必須）"
            value={fromName}
            fullWidth
            sx={styles.form}
            onChange={(e) => setFromName(e.target.value)}
          />
          <TextField
            label="タイトル"
            value={title}
            fullWidth
            sx={styles.form}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="メールアドレス（必須）"
            value={email}
            fullWidth
            sx={styles.form}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="電話番号"
            value={phoneNumber}
            fullWidth
            sx={styles.form}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextareaAutosize
            minRows={10}
            placeholder={"お問い合わせ内容（必須）"}
            style={styles.form}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <Button variant="contained" component="label" onClick={onSubmit}>
            お問い合わせ
          </Button>
        </Box>
        <Box sx={styles.rightContainer}>
          <RightContent />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Inquiry;
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
  },
  titleBox: {
    padding: 3,
    bgcolor: "whitesmoke",
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  imageBox: {
    display: "flex",
    flexDirection: "column" as "column",
    width: "90%",
    paddingTop: 7,
    paddingBottom: 5,
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
  itemContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingRight: 20,
    width: "30%",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    width: "100%",
    paddingTop: 5,
    paddingLeft: 5,
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
  },
  menuBox: {
    display: "flex",
    flexDirection: "column" as "column",
    paddingLeft: 5,
  },
  menuTitle: {
    fontWeight: "bold",
    color: "dimgray",
    paddingTop: 2,
  },
  introduction: {
    fontWeight: "lighter",
    color: "dimgray",
    paddingTop: 2,
  },
  pagenate: {
    marginTop: 5,
    marginBottom: 10,
  },
  rightContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "30%",
    marginRight: 5,
  },
  form: {
    width: "50%",
    paddingBottom: 3,
  }
};
