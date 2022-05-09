import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import Home from "./components/Home";
import { store } from "./slices/store";

function App() {
  return (
    <Provider store={store}>
    <div>
      <h1>Bitcoin Price!!!!</h1>
      <Home />
    </div>
    </Provider>
  );
}

export default App;
