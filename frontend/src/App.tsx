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
  CounselorInfo,
  Chat,
} from "./Pages";

function App() {
  return (
    <Router>
      <Toaster />
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
              <Options />
              <Menu />
            </>
          }
          path="/settings/options"
        />
        <Route
          element={
            <>
              <Navbar />
              <EditAcc />
              <Menu />
            </>
          }
          path="/settings/acc"
        />
        <Route
          element={
            <>
              <Navbar />
              <Dashboard />
              <Menu />
            </>
          }
          path="/settings/admin"
        />
        <Route
          element={
            <>
              <Navbar />
              <Counselor />
              <Menu />
            </>
          }
          path="/settings/admin/counselor"
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
              <CreateFeed />
              <Menu />
            </>
          }
          path="/editfeed/:id"
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
              <CounselorInfo />
              <Menu />
            </>
          }
          path="/talks/:id/info"
        />
        <Route
          element={
            <>
              <Navbar />
              <CounselorInfo />
              <Menu />
            </>
          }
          path="/talks/:id/info"
        />
        <Route
          element={
            <>
              <Chat />
            </>
          }
          path="/chat/:id"
        />
        <Route
          element={
            <>
              <Navbar />
              <Quotes />
              <Menu />
            </>
          }
          path="/quotes"
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
