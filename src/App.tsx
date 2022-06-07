import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Article from "./components/Article";
import Content from "./components/Content";
import Home from "./components/Home";
import Serch from "./components/Serch";
import { store } from "./slices/store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"article"} element={<Article />} />
          <Route path={"content"} element={<Content />} />
          <Route path={"serch"} element={<Serch />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
