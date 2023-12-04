import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";

import Navbar from "./layouts/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./layouts/Footer/Footer";
import Tracking from "./pages/Tracking/Tracking";
import EndingSoon from "./pages/EndingSoon/EndingSoon";
import Departments from "./pages/Departments/Departments";
import MyAuctionWon from "./pages/MyAuctionWon/MyAuctionWon";
import Packs from "./pages/Packs/Packs";
import Settings from "./pages/Settings/Settings";
import AuctionLive from "./pages/AuctionLive/AuctionLive";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/ending-soon" element={<EndingSoon />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/my-auctions-won" element={<MyAuctionWon />} />
        <Route path="/live-auctions" element={<AuctionLive />} />
        <Route path="/packs" element={<Packs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
