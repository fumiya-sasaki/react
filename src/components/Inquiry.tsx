import { Box, Button, Pagination, TextareaAutosize, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { init, send } from "emailjs-com";
import RightContent from "./RightParts";

export const Inquiry = () => {

  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const onSubmit = async () => {
    const userID = process.env.REACT_APP_USER_ID;
    const serviceID = process.env.REACT_APP_SERVICE_ID;
    const templateID = process.env.REACT_APP_TEMPLATE_ID;
    if (name !== "" && email !== "" && message !== "") {
      if (userID && serviceID && templateID) {
        init(userID)
        const params = {
          name,
          email,
          title,
          message,
          phoneNumber,
        }
        try {
          await send(serviceID, templateID, params)
          alert('送信成功')
        } catch (error) {
          alert('送信失敗しました。もう一度送信してください。')
        }
      }
    } else {
      alert('必須項目を入力してもう一度送信ボタンを押してください。')
    }
  }

  return (
    <>
      <Header title={"お問い合わせ"} />
      <Box sx={styles.container}>
        <Box sx={styles.leftContainer}>
          <TextField
            label="お名前（必須）"
            value={name}
            fullWidth
            sx={styles.form}
            onChange={(e) => setName(e.target.value)}
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
          <TextField
            label="タイトル"
            value={title}
            fullWidth
            sx={styles.form}
            onChange={(e) => setTitle(e.target.value)}
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
