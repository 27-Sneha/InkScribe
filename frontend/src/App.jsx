import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogList from "./pages/BlogList";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./component/Navbar";
import CreateBlog from "./pages/CreateBlog";
import AboutUs from "./pages/AboutUs";
import BlogDetail from "./pages/BlogDetail";
import Footer from "./component/Footer";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  const location = useLocation();
  const paths = ["/login", "/register"];
  return (
    <div className="App">
      {!paths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<BlogList />}></Route>
        <Route path="/blogDetail" element={<BlogDetail />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/create" element={<CreateBlog />}></Route>
        </Route>
      </Routes>
      {!paths.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
