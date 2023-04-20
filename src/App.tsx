import React, { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Loader from "react-loader-advanced";
import { IUser } from "./types/user";
import Loading from "./components/Loader/Loading";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";

type ContextType = { user: IUser | null };

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, isLoading] = useState<boolean>(false);

  const handleLoading = () => {
    isLoading(true);
    setTimeout(() => {
      isLoading(false);
    }, 1000);
  };

  useEffect(() => {
    handleLoading();
  }, [window.onload]);

  const spinner = <Loading />;

  return (
    <Loader show={loading} message={spinner}>
      <NavBar context={{ user, setUser }} />

      <Outlet context={{ user, setUser }} />

      <Footer />
    </Loader>
  );
}

export function useUser() {
  return useOutletContext<ContextType>();
}

export default App;
