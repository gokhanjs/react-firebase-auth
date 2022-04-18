import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
//import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exect path="/" element={<Dashboard />} />
            <Route exect path="/signup" element={<Signup />} />
            <Route exect path="/login" element={<Login />} />
            <Route exect path="/forgot-password" element={<ForgotPassword />} />
            <Route exect path="/update-profile" element={<UpdateProfile />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
