import { getFirestore } from "firebase/firestore";
import React from "react";
import { FirestoreProvider, useFirebaseApp } from "reactfire";
import "./App.css";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <h1>Bitcoin Price!!!!</h1>
      <Home />
    </div>
  );
}

export default App;
