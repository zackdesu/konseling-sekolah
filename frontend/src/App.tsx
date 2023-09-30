import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar";
import Menu from "./Components/menu";
import { Toaster } from "react-hot-toast";
import { AccProvider } from "./context/accContext";
import { Suspense, lazy } from "react";

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
  CreateFeed,
  EditAcc,
  Options,
  Reflection,
} from "./Pages";
import { CgSpinnerTwoAlt } from "react-icons/cg";

const Dashboard = lazy(() => import("./Pages/dashboard"));
const CounselorInfo = lazy(() => import("./Pages/counselorinfo"));
const Counselor = lazy(() => import("./Pages/counselor"));

function App() {
  return (
    <Router>
      <AccProvider>
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
                <Suspense
                  fallback={
                    <>
                      <CgSpinnerTwoAlt
                        className="mx-auto animate-spin my-1 py-20"
                        size={50}
                      />
                    </>
                  }
                >
                  <Dashboard />
                </Suspense>
                <Menu />
              </>
            }
            path="/settings/admin"
          />
          <Route
            element={
              <>
                <Navbar />
                <Suspense
                  fallback={
                    <>
                      <CgSpinnerTwoAlt
                        className="mx-auto animate-spin my-1 py-20"
                        size={50}
                      />
                    </>
                  }
                >
                  <Counselor />
                </Suspense>
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
                <Suspense
                  fallback={
                    <>
                      <CgSpinnerTwoAlt
                        className="mx-auto animate-spin my-1 py-20"
                        size={50}
                      />
                    </>
                  }
                >
                  <CounselorInfo />
                </Suspense>
                <Menu />
              </>
            }
            path="/talks/:id/info"
          />
          <Route
            element={
              <>
                <Navbar />
                <Reflection />
                <Menu />
              </>
            }
            path="/reflection"
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
      </AccProvider>
    </Router>
  );
}

export default App;
