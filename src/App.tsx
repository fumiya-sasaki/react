import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import Home from "./components/Home";
import { store } from "./slices/store";

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
