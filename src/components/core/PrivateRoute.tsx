import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase";

type Props = {
  children: JSX.Element;
};

export const PrivateRoute: React.FC<Props> = (props) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState<User>();
  const { children } = props;

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
  }, []);

  useEffect(() => {
    setAuthChecked(user ? true : false);
  }, [user]);

  return (
    authChecked ? user ? children : <Navigate to="/login" /> : <></>
  );
};

export default PrivateRoute;