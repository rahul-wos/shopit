import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import UsersProvider from "./contexts/DBContext";
import Practice from "./pages/Temp/Temp";
import "./App.css";

function App() {
  return (
    <UsersProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/practice" element={<Practice />} />
          </Routes>
        </Router>
      </div>
    </UsersProvider>
  );
}

export default App;
