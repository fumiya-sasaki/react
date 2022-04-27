import { collection } from "firebase/firestore";
import React from "react";
import { useFirestore } from "reactfire";
import db from './core/firebase';

export const Home = () => {
  const firestore = useFirestore();
  const test = collection(firestore, 'test');
  const citiesCol = collection(db, 'test');
  console.log(citiesCol);
  return (
    <div className="App">
      <header className="App-header">
        <p>
         sasaki fumiya
        </p>
      </header>
    </div>
  );
};

export default Home;
