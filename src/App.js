import { Route, Routes } from "react-router-dom";
import "./App.scss";

import Navbar from "./layouts/Navbar/Navbar";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/live-auctions" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
