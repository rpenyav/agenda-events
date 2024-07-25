import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Detalle from "../pages/Detalle";
import Layout from "../layout/Layout";
import { AuthProvider } from "../context/AuthContext";

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detalle/:codi/:denominaci" element={<Detalle />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
