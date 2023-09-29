import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar";
import Menu from "./Components/menu";
import { Toaster } from "react-hot-toast";
<<<<<<< HEAD
=======
import { AccProvider } from "./context/accContext";

>>>>>>> 2b543f7f9eba8b71fb457401aaa4598886df09e1
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
<<<<<<< HEAD
=======
  CounselorInfo,
>>>>>>> 2b543f7f9eba8b71fb457401aaa4598886df09e1
} from "./Pages";

function App() {
  return (
    <Router>
<<<<<<< HEAD
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
=======
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
      </AccProvider>
>>>>>>> 2b543f7f9eba8b71fb457401aaa4598886df09e1
    </Router>
  );
}

export default App;
