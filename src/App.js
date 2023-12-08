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
import TermsAndCond from "./pages/TermsAndCond/TermsAndCond";

import useScrollToTopOnRouteChange from "./hooks/useToTop";
import ClosedAuctions from "./pages/ClosedAuctions/ClosedAuctions";
import LiveAuctions from "./pages/LiveAuctions/LiveAuctions";
import SellYourArticle from "./pages/SellYourArticle/SellYourArticle";
import AuctionsClosed from "./pages/AuctionsClosed/AuctionsClosed";
import Informations from "./pages/Informations/Informations";

function App() {
  useScrollToTopOnRouteChange();
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/tracking" element={<Tracking />} />

        <Route path="/ending-soon" element={<EndingSoon />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/live-auctions" element={<LiveAuctions />} />
        <Route path="/auctions-closed" element={<ClosedAuctions />} />

        <Route path="/live-auctions/:id" element={<AuctionLive />} />
        <Route path="/auctions-closed/:id" element={<AuctionsClosed />} />
        <Route path="/my-auctions-won" element={<MyAuctionWon />} />
        <Route path="/terms-and-conditions" element={<TermsAndCond />} />
        <Route path="/informations" element={<Informations />} />
        <Route path="/packs" element={<Packs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/add-product" element={<SellYourArticle />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
