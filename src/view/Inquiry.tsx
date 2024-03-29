import { Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { init, send } from "emailjs-com";

export const Inquiry = React.memo(() => {

  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isRequired, setIsRequired] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async () => {
    setIsRequired(true);
    setLoading(true);
    const userID = process.env.REACT_APP_USER_ID;
    const serviceID = process.env.REACT_APP_SERVICE_ID;
    const templateID = process.env.REACT_APP_TEMPLATE_ID;
    if (userID && serviceID && templateID) {
      init(userID)
      const params = { name, email, title, message, phoneNumber }
      try {
        await send(serviceID, templateID, params);
        setIsRequired(false);
        setLoading(false);
        alert('お問い合わせありがとうございます。\n随時確認の上ご連絡させていただきます。');
      } catch (error) {
        setIsRequired(false);
        setLoading(false);
        alert('送信失敗しました。もう一度送信してください。');
      }
    }
  }, []);

  useEffect(() => {
    if (name !== "" && email !== "" && message !== "") {
      setIsRequired(false);
    } else {
      setIsRequired(true);
    };
  }, [name, email, message]);
  const buttonContent = !loading ? 'お問い合わせ' : <CircularProgress color='inherit' size={23} />;
  return (
    <>
      <Header title={"Contact"} />
      <Box sx={styles.container}>
        <Box sx={styles.box}>
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
          <Button variant="contained" component="label" onClick={onSubmit} sx={styles.buttom} disabled={isRequired}>
            {buttonContent}
          </Button>
        </Box>
      </Box>
      <Footer />
    </>
  );
});

export default Inquiry;
const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    width: { xs: '100%', sm: "100%" },
    paddingTop: 5,
  },
  box: {
    width: { xs: '100%', md: '1000px' },
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
  },
  form: {
    width: { xs: '80%', sm: '60%' },
    paddingBottom: 3,
    'MuiOutlinedInput-root::input': {
      height: '200px'
    }
  },
  buttom: {
    width: { xs: '80%', sm: '60%' },
    marginTop: 1,
    marginBottom: 1,
  }
};
