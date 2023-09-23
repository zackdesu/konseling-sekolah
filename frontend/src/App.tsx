import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar";
import Menu from "./Components/menu";
import { Toaster } from "react-hot-toast";
import {
  Home,
  Login,
  Register,
  Profile,
  LandingPage,
  NotFound,
  Tentang,
  Settings,
  Feed,
  Talks,
  Quiz,
  CreateFeed,
  Quotes,
  EditAcc,
  Options,
  Counselor,
  Dashboard,
} from "./Pages";

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
              <Dashboard />
              <Menu />
            </>
          }
          path="/settings/admin"
        />
        <Route
          element={
            <>
              <Counselor />
              <Menu />
            </>
          }
          path="/settings/admin/counselor"
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
