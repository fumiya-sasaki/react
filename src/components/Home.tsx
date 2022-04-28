import { collection, getDocs } from "firebase/firestore";
import React from "react";
import db from './core/firebase';

export const Home = () => {
  const getColecction = async () => {
    const getDoc = await getDocs(collection(db, "test"));
    getDoc.forEach((doc) => {
      console.log(doc.data().name)
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>
         sasaki fumiya
        </p>
        <button onClick={getColecction}>test</button>
      </header>
    </div>
  );
};

export default Home;
