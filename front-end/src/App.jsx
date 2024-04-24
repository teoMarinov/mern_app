import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Singup from "./components/singup/Singup";
import Singin from "./components/singin/Singin";
import AuthProvider from "./context/AuthProvider";
import PrivateRoutes from "./routes/PrivateRoutes";
import NewPost from "./components/newPost/NewPost";
import ListPosts from "./components/allPosts/ListPosts";

export default function App() {
  return (
    <div className="h-full w-full overflow-x-hidden">
      <AuthProvider>
        <Header />
        <div className="overflow-auto">
          <Routes>
            <Route path="/" element={<ListPosts />} />

            <Route element={<PrivateRoutes />}>
              <Route path="/new-post" element={<NewPost />} />
              <Route path="/update" element={"update"} />
            </Route>

            <Route path="/logout" element={"logout"} />
            <Route path="/singup" element={<Singup />} />
            <Route path="/Singin" element={<Singin />} />
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </div>)
}