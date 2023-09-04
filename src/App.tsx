import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import Home from "./home";

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
      </Routes>
    </Router>
  );
}

export default App;
