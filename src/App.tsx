import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Main from "./pages/Main";
import ProductPage from "./pages/ProductPage/ProductPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="" element={<Home />} />
          <Route path="product" element={<ProductPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
