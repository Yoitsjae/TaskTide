import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ServiceListings from "./pages/ServiceListings";
import Profile from "./pages/Profile";
import Booking from "./pages/Booking";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServiceListings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
