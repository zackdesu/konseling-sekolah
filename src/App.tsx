import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Profile from "./Pages/profile";
import LandingPage from "./Pages/landingpage";
import NotFound from "./Pages/notfound";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <>
              <Navbar />
              <LandingPage />
            </>
          }
          path="/"
        />
        <Route
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
          path="/home"
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
        <Route
          element={
            <>
              <Navbar />
              <NotFound />
            </>
          }
          path="*"
        />
      </Routes>
    </Router>
  );
}

export default App;
