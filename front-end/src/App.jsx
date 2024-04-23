import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Singup from "./components/singup/Singup";

export default function App() {
  return (
    <>
      <Header />
      <div id="body">
        <Routes>
          <Route path="/" element={"Product"} />
          <Route path="/add" element={"add"} />
          <Route path="/update" element={"update"} />
          <Route path="/logout" element={"logout"} />
          <Route path="/profile" element={<Singup />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}