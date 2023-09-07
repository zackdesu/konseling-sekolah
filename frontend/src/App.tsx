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
import Feed from "./Pages/feed";
import Talks from "./Pages/talks";
import Quiz from "./Pages/quiz";
import CreateFeed from "./Pages/createfeed";

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
              <Feed />
              <Menu />
            </>
          }
          path="/feed"
        />
        <Route
          element={
            <>
              <Navbar />
              <Quiz />
              <Menu />
            </>
          }
          path="/quiz"
        />
        <Route
          element={
            <>
              <Navbar />
              <CreateFeed />
              <Menu />
            </>
          }
          path="/createfeed"
        />
        <Route
          element={
            <>
              <Navbar />
              <Talks />
              <Menu />
            </>
          }
          path="/talks"
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
