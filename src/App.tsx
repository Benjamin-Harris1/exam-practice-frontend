import "./index.css"
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/admin/AdminPage";
import Home from "./pages/home/Home";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Layout>
  )


}

export default App