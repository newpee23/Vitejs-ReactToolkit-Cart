import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useSelector } from 'react-redux'
// Components
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";

function UnAuthApp() {
  return (
    <div className="w-full">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  </div>
  );
}

function AuthApp() {
  return (
    <div className="w-full">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  </div>
  );
}

function App() {
  const { user } = useSelector((state) => state?.auth);

  return (
    <div>
      <Router>
        <Header />
       {!user ? <UnAuthApp/>:<AuthApp/>}
      </Router>
    </div>
  );
}

export default App;
