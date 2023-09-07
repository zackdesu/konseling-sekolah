import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Profile from "./Pages/profile";
import LandingPage from "./Pages/landingpage";
import NotFound from "./Pages/notfound";
import Tentang from "./Pages/tentang";
import Menu from "./Components/menu";
import Settings from "./Pages/settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <>
              <Navbar />
              <LandingPage />
              <Menu />
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
              <Menu />
            </>
          }
          path="/login"
        />
        <Route
          element={
            <>
              <Navbar />
              <Register />
              <Menu />
            </>
          }
          path="/register"
        />
        <Route
          element={
            <>
              <Navbar />
              <Profile />
              <Menu />
            </>
          }
          path="/profil"
        />
        <Route
          element={
            <>
              <Navbar />
              <Tentang />
              <Menu />
            </>
          }
          path="/tentang"
        />
        <Route
          element={
            <>
              <Navbar />
              <Settings />
              <Menu />
            </>
          }
          path="/settings"
        />
        <Route
          element={
            <>
              <Navbar />
              <NotFound />
              <Menu />
            </>
          }
          path="*"
        />
      </Routes>
    </Router>
  );
}

export default App;
