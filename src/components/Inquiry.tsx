import { Box, Button, Pagination, TextareaAutosize, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { init, send } from "emailjs-com";
import RightContent from "./RightParts";
import InputUnstyled, { InputUnstyledProps } from '@mui/base/InputUnstyled';
import { styled } from '@mui/system';
export const Inquiry = () => {

  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isRequired, setIsRequired] = useState<boolean>(true);

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
  };

  useEffect(() => {
    if (name !== "" && email !== "" && message !== "") {
      setIsRequired(false)
    } else {
      setIsRequired(true)
    };
  }, [name, email, message])
  const StyledTextareaElement = styled('textarea', {
    shouldForwardProp: (prop) =>
      !['ownerState', 'minRows', 'maxRows'].includes(prop.toString()),
  })(
    ({ theme }) => `
    width: 320px;
    font-size: 0.875rem;
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    border-radius: 8px;
    padding: 12px 12px;
  
  `,
  );
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
            multiline={true}
            rows={3}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="お問い合わせ内容（必須）"
            value={message}
            fullWidth
            sx={styles.form}
            multiline={true}
            minRows={10}
            onChange={(e) => setMessage(e.target.value)}
          />
          {/* <TextareaAutosize
            minRows={10}
            placeholder={"お問い合わせ内容（必須）"}
            // sx={{ marginTop: 1, width: '50%' }}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          /> */}
          <Button variant="contained" component="label" onClick={onSubmit} sx={styles.buttom} disabled={isRequired}>
            お問い合わせ
          </Button>
        </Box>
        <RightContent />
      </Box>
      <Footer />
    </>
  );
};

export default Inquiry;
const styles = {
  container: {
    display: "flex",
    flexDirection: { xs: 'column' as 'column', sm: 'row' as 'row' },
    alignItems: "space-between",
    justifyContent: "space-between",
  },
  leftContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    width: { xs: '100%', sm: "70%" },
    paddingTop: 5,
  },
  form: {
    width: { xs: '80%', sm: '70%', md: '50%' },
    paddingBottom: 3,
    'MuiOutlinedInput-root::input': {
      height: '200px'
    }
  },
  buttom: {
    width: { xs: '80%', sm: '70%', md: '50%' },
    marginTop: 1,
    marginBottom: 1,
  }
};
