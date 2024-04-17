import "./index.css"
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
//import Home from "./pages/home/Home";
import { ProductList } from "./pages/product/ProductList";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Layout>
  )


}

export default App