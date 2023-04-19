import React, { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { IUser } from "./types/user";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";

type ContextType = { user: IUser | null };

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <>
      <NavBar context={{ user, setUser }} />

      <Outlet context={{ user, setUser }} />

      <Footer />
    </>
  );
}

export function useUser() {
  return useOutletContext<ContextType>();
}

export default App;
