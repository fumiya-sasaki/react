import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminContent from "./components/admin/AdminContent";
import AdminHome from "./components/admin/AdminHome";
import AdminSerch from "./components/admin/AdminSerch";
import Article from "./components/Article";
import Content from "./components/Content";
import PrivateRoute from "./components/core/PrivateRoute";
import Gallery from "./components/Gallery";
import Home from "./components/Home";
import Inquiry from "./components/Inquiry";
import Login from "./components/Login";
import NewArrival from "./components/NewArrival";
import Serch from "./components/Serch";
import { store } from "./slices/store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"admin/home"} element={<PrivateRoute children={<AdminHome />} />} />
          <Route path={"admin/content"} element={<PrivateRoute children={<AdminContent />} />} />
          <Route path={"admin/serch"} element={<PrivateRoute children={<AdminSerch />} />} />
          <Route path={"admin/article"} element={<PrivateRoute children={<Article />} />} />
          <Route path={"content"} element={<Content />} />
          <Route path={"serch"} element={<Serch />} />
          <Route path={"newArrival"} element={<NewArrival />} />
          <Route path={"inquiry"} element={<Inquiry />} />
          <Route path={"gallery"} element={<Gallery />} />
          <Route path={"login"} element={<Login />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
