import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Pages/navbar";
import Home from "./Pages/home";
import Login from "./Pages/login";

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
      </Routes>
    </Router>
  );
}

export default App;
