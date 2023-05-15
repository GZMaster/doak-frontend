import React from "react";
import { Outlet } from "react-router-dom";
import AuthProvider from "./providers/authentication/AuthProvider";
import { LoadingProvider } from "./services/LoadingContext";
import { ProductsProvider } from "./services/ProductsContext";
import Loading from "./components/Loader/Loading";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <LoadingProvider LoadingComponent={Loading}>
          <NavBar />

          <Outlet />

          <Footer />
        </LoadingProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
