import "./index.css";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import { Home } from "./pages/home/Home";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Layout>
  )


}

export default App
