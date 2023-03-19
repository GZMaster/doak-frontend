import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";

export default function Main() {
  return (
    <>
      <NavBar />
      <Outlet />
      <div
        style={{
          height: "30vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        COMING SOON
      </div>
      <Footer />
    </>
  );
}
