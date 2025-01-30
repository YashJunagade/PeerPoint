import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import FindPeer from "./pages/FindPeer";
import Messenger from "./pages/Messenger";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/FindPeer" element={<FindPeer />} />
        <Route path="/Messenger" element={<Messenger />} />
      </Routes>
    </Router>
  );
}

export default App;
