import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";

import Navbar from "./layouts/Navbar/Navbar";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
