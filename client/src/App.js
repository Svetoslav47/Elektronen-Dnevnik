import React from "react";
import { AuthProvider } from "./contexts/AuthContext.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import ChangeTempPassword from "./pages/ChangePassword/ChangeTempPassword.jsx";
import Marks from "./pages/Grades/Marks.jsx";

import "./App.css";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            exact
            path="/signin/changeTempPassword"
            element={<ChangeTempPassword />}
          />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="*" element={<MainSite />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const MainSite = () => {
  const { logOut, currentUser } = useAuth();
  const navigate = useNavigate();

  if (currentUser == null) {
    setTimeout(() => {
      /*if (currentUser != null && !currentUser?.hasChangedTempPassword) {
            navigate("/signin/changeTempPassword");
        }else */ if (currentUser == null) {
        navigate("/signin");
      }
    }, 2);
    return;
  }
  const handleSignOut = () => {
    logOut().then(() => {
      navigate("/signin");
    });
  };

  return (
    <>
      <div className="topBar">
        <button onClick={handleSignOut}>log out</button>
      </div>
      <div className="sideAndHolder">
        <div className="sideBar">test</div>
        <div className="site">
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route exact path="/marks" element={<Marks />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
