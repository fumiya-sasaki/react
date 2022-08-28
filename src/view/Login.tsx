import { Box, Button, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { auth } from "../components/core/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = React.memo(() => {
  const navigation = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const loginSubmit = useCallback(async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigation("/admin/home");
    } catch (error) {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  }, [email, password]);

  return (
    <>
      <Box sx={styles.container}>
        <TextField
          label="メールアドレス"
          value={email}
          fullWidth
          sx={styles.form}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="パスワード"
          value={password}
          fullWidth
          sx={styles.form}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" component="label" onClick={loginSubmit}>
          ログイン
        </Button>
      </Box>
    </>
  );
});

export default Login;
const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
  },
  form: {
    width: "50%",
    paddingBottom: 3,
  }
};
