import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import NavBar from "../components/navbar/NavBar";
import Newsletter from "../components/news/Newsletter";
import Sidebar from "../components/sidebar/Sidebar";

export default function Main() {
  return (
    <>
      <NavBar />
      <Hero />
      <Sidebar />
      <div style={{ height: "80vh" }}>hello</div>
      <Newsletter />
      <Footer />
    </>
  );
}
