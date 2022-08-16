import { ThemeProvider, useTheme } from "@mui/material/styles";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminConfig from "./components/admin/AdminConfig";
import AdminContent from "./components/admin/AdminContent";
import AdminHome from "./components/admin/AdminHome";
import AdminSerch from "./components/admin/AdminSearch";
import Article from "./components/admin/Article";
import Content from "./components/Content";
import PrivateRoute from "./components/core/PrivateRoute";
import Gallery from "./components/Gallery";
import Home from "./components/Home";
import Inquiry from "./components/Inquiry";
import Login from "./components/Login";
import NewArrival from "./components/NewArrival";
import PickUpWord from "./components/PickUpWord";
import Search from "./components/Search";
import { store } from "./slices/store";

function App() {
  const theme = useTheme();
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"admin/home"} element={<PrivateRoute children={<AdminHome />} />} />
            <Route path={"admin/content"} element={<PrivateRoute children={<AdminContent />} />} />
            <Route path={"admin/search"} element={<PrivateRoute children={<AdminSerch />} />} />
            <Route path={"admin/article"} element={<PrivateRoute children={<Article />} />} />
            <Route path={"admin/config"} element={<PrivateRoute children={<AdminConfig />} />} />
            <Route path={"content"} element={<Content />} />
            <Route path={"search"} element={<Search />} />
            <Route path={"newArrival"} element={<NewArrival />} />
            <Route path={"pickUpWord"} element={<PickUpWord />} />
            <Route path={"inquiry"} element={<Inquiry />} />
            <Route path={"gallery"} element={<Gallery />} />
            <Route path={"login"} element={<Login />} />
          </Routes>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
