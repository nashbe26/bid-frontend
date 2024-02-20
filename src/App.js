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
import io from "socket.io-client";
import useScrollToTopOnRouteChange from "./hooks/useToTop";
import ClosedAuctions from "./pages/ClosedAuctions/ClosedAuctions";
import LiveAuctions from "./pages/LiveAuctions/LiveAuctions";
import SellYourArticle from "./pages/SellYourArticle/SellYourArticle";
import AuctionsClosed from "./pages/AuctionsClosed/AuctionsClosed";
import Informations from "./pages/Informations/Informations";
import AllPopups from "./pages/Popups/AllPopups";
import ContactUs from "./pages/ContactUs/ContactUs";
import { useUser } from "./utils/functions/user/user";
import { useDispatch, useSelector } from "react-redux";
import { getSocket, setSocket } from "./store/socket";
import { selectIsConnected, selectUser } from "./store/userSlice";
import { showSuccessToast } from "./pages/toast/toast";
import { useEffect } from "react";
import COommingAuction from "./pages/coming-auction/ClosedAuctions";
import SuccessVerifSocail from "./pages/successVerif/sucess-verif";
import Profile from "./pages/profile/profile";

// import Scrollbar from "./utils/Scrollbar";

function App() {

  const { data, error, isLoading,refetch } = useUser();
  const isConnected = useSelector(selectIsConnected);
  const user = useSelector(selectUser);
  useScrollToTopOnRouteChange();

  const socket = useSelector(getSocket);
  const dispatch = useDispatch();
  const handleBroadcastTimer = (data) => {
    console.log(data[0]);
  };
  useEffect(() => {
    if (socket && user._id) {
      
      socket.emit('newUser', user._id);
      
      socket.on('notification', (data) => {
        showSuccessToast(data.description);
      });
      
      socket.emit('ready');

      socket.on('boradcastTimer', handleBroadcastTimer);
    }
  
    return () => {
      // Clean up event listeners when the component unmounts
      if (socket) {
        socket.off('notification');
        socket.off('boradcastTimer');
      }
    };
  }, [socket, user._id]);

  useEffect(() => {
    if (isConnected) {
      const newSocket = io(`https://urakkahuuto.fi/`);
      dispatch(setSocket(newSocket));
      return () => newSocket.close();
    }
  }, [isConnected]);  

  return (
    <div className="App">
      {/* <Scrollbar /> */}
      <Navbar />
      <AllPopups />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/user/:id" element={<Profile />} />

        <Route path="/ending-soon" element={<EndingSoon />} />
        <Route path="/departments/:id" element={<Departments />} />
        <Route path="/live-auctions" element={<LiveAuctions />} />
        <Route path="/auctions-closed" element={<ClosedAuctions />} />
        <Route path="/auctions-coming" element={<COommingAuction />} />
        <Route path="/live-auctions/:id" element={<AuctionLive />} />
        <Route path="/product-list/:id" element={<AuctionsClosed />} />
        <Route path="/my-auctions-won" element={<MyAuctionWon />} />
        <Route path="/my-auctions-fav" element={<MyAuctionWon />} />
        <Route path="/terms-and-conditions" element={<TermsAndCond />} />
        <Route path="/informations" element={<Informations />} />
        <Route path="/packs" element={<Packs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/add-product" element={<SellYourArticle />} />
        <Route path="/social-verif/:token" element={<SuccessVerifSocail />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
