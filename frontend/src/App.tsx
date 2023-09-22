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
import Quotes from "./Pages/quotes";
import { Toaster } from "react-hot-toast";
import EditAcc from "./Pages/editacc";
import Options from "./Pages/options";

function App() {
  return (
    <Router>
      <Navbar />
      <Toaster />
      <Routes>
        <Route
          element={
            <>
              <LandingPage />
              <Menu />
            </>
          }
          path="/"
        />
        <Route
          element={
            <>
              <Home />
            </>
          }
          path="/home"
        />
        <Route
          element={
            <>
              <Login />
            </>
          }
          path="/login"
        />
        <Route
          element={
            <>
              <Register />
            </>
          }
          path="/register"
        />
        <Route
          element={
            <>
              <Profile />
              <Menu />
            </>
          }
          path="/profil"
        />
        <Route
          element={
            <>
              <Tentang />
              <Menu />
            </>
          }
          path="/tentang"
        />
        <Route
          element={
            <>
              <Settings />
              <Menu />
            </>
          }
          path="/settings"
        />
        <Route
          element={
            <>
              <Options />
              <Menu />
            </>
          }
          path="/settings/options"
        />
        <Route
          element={
            <>
              <EditAcc />
              <Menu />
            </>
          }
          path="/settings/acc"
        />
        <Route
          element={
            <>
              <Feed />
              <Menu />
            </>
          }
          path="/feed"
        />
        <Route
          element={
            <>
              <Quiz />
              <Menu />
            </>
          }
          path="/quiz"
        />
        <Route
          element={
            <>
              <CreateFeed />
              <Menu />
            </>
          }
          path="/createfeed"
        />
        <Route
          element={
            <>
              <CreateFeed />
              <Menu />
            </>
          }
          path="/editfeed/:id"
        />
        <Route
          element={
            <>
              <Talks />
              <Menu />
            </>
          }
          path="/talks"
        />
        <Route
          element={
            <>
              <Quotes />
              <Menu />
            </>
          }
          path="/quotes"
        />
        <Route
          element={
            <>
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
