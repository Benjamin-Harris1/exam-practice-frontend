import "./index.css"
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/admin/Admin";
import Home from "./pages/home/Home";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Layout>
  )


}

export default App