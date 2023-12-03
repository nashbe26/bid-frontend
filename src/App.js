import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";

import Navbar from "./layouts/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./layouts/Footer/Footer";
import Tracking from "./pages/Tracking/Tracking";
import EndingSoon from "./pages/EndingSoon/EndingSoon";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/ending-soon" element={<EndingSoon />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
