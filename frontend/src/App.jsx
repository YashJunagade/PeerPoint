import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import FindPeer from "./pages/FindPeer";
import Messenger from "./pages/Messenger";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./store/UserContext";
import { SocketProvider } from "./store/UseSocket";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <UserProvider>
        <SocketProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/Profile/:id" element={<Profile />} />
              <Route path="/FindPeer" element={<FindPeer />} />
              <Route
                path="/Messenger"
                element={<PrivateRoute element={<Messenger />} />}
              />
            </Routes>
          </Router>
        </SocketProvider>
      </UserProvider>
    </>
  );
}

export default App;
