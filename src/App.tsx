import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import "./App.css";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const dbName = "database";

export const getDB = () => {
  return JSON.parse(localStorage.getItem(dbName) || "");
};

export const setDB = (data: User) => {
  localStorage.setItem(dbName, JSON.stringify(data));
};

function App() {
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
