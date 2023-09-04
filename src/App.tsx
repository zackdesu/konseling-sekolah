import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Pages/navbar";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Profile from "./Pages/profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
          path="/"
        />
        <Route
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
          path="/login"
        />
        <Route
          element={
            <>
              <Navbar />
              <Register />
            </>
          }
          path="/register"
        />
        <Route
          element={
            <>
              <Navbar />
              <Profile />
            </>
          }
          path="/profil"
        />
      </Routes>
    </Router>
  );
}

export default App;
