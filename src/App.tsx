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
import Content from "./view/Content";
import PrivateRoute from "./components/core/PrivateRoute";
import ScrollToTop from "./components/core/ScrollToTop";
import Gallery from "./view/Gallery";
import Home from "./view/Home";
import Inquiry from "./view/Inquiry";
import Login from "./view/Login";
import NewArrival from "./view/NewArrival";
import PickUpWord from "./view/PickUpWord";
import Search from "./view/Search";
import { store } from "./slices/store";
import Profile from "./view/Profile";
import Config from "./components/core/Config";

function App() {
  const theme = useTheme();
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <ScrollToTop />
          <Config />
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
            <Route path={"gallery"} element={<Gallery />} />
            <Route path={"inquiry"} element={<Inquiry />} />
            <Route path={"profile"} element={<Profile />} />
            <Route path={"login"} element={<Login />} />
          </Routes>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
