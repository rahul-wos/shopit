import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import "./App.css";
import { useEffect, useState } from "react";

// const dbName = "database";

// export const getDB = () => {
//   return JSON.parse(localStorage.getItem(dbName));
// };

// export const setDB = (data) => {
//   return JSON.parse(localStorage.setItem(dbName, data));
// };

function App() {
  // const [database, setDatabase] = useState(() => {});

  // useEffect(() => {
  //   const data = getDB();
  // }, [data]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
