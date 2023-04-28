import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AuthProvider from "./providers/authentication/AuthProvider";
import Loader from "react-loader-advanced";
import Loading from "./components/Loader/Loading";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";

function App() {
  const [loading, isLoading] = useState<boolean>(false);

  const handleLoading = () => {
    isLoading(true);
    setTimeout(() => {
      isLoading(false);
    }, 3000);
  };

  useEffect(() => {
    handleLoading();
  }, [window.onload]);

  const spinner = <Loading />;

  return (
    <AuthProvider>
      <Loader show={loading} message={spinner}>
        <NavBar />

        <Outlet />

        <Footer />
      </Loader>
    </AuthProvider>
  );
}

export default App;
