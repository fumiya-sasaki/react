import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminContent from "./components/admin/AdminContent";
import AdminHome from "./components/admin/AdminHome";
import Article from "./components/Article";
import Content from "./components/Content";
import Home from "./components/Home";
import Inquiry from "./components/Inquiry";
import Serch from "./components/Serch";
import { store } from "./slices/store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"admin/home"} element={<AdminHome />} />
          <Route path={"admin/content"} element={<AdminContent />} />
          <Route path={"admin/serch"} element={<AdminContent />} />
          <Route path={"admin/article"} element={<Article />} />
          <Route path={"content"} element={<Content />} />
          <Route path={"serch"} element={<Serch />} />
          <Route path={"inquiry"} element={<Inquiry />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
