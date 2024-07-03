import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogList from "./pages/BlogList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import CreateBlog from "./pages/CreateBlog";
import AboutUs from "./pages/AboutUs";
import BlogDetail from "./pages/BlogDetail";
import Footer from "./component/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<BlogList />}></Route>
          <Route path="/create" element={<CreateBlog />}></Route>
          <Route path="/blogDetail" element={<BlogDetail />}></Route>
          <Route path="/about" element={<AboutUs />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
