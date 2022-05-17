import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Content from "./components/Content";
import Home from "./components/Home";
import { store } from "./slices/store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path="content" element={<Content />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
