import { useEffect, useState } from "react";
import { Product } from "../../interfaces/interface";
import { deleteProduct, getProducts } from "../../api/api";
import ProductForm from "./ProductForm";
import Modal from "../Modal";
import ProductDetails from "./ProductDetails";

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete' | 'details'>('create');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await getProducts();
    setProducts(response);
  };

  const openModal = (type: 'create' | 'edit' | 'delete', product?: Product) => {
    setIsModalOpen(true);
    setModalType(type);
    setSelectedProduct(product || null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null); // Reset selected product on modal close
    fetchProducts(); // Refresh the product list after any operation
  };

  const handleDelete = async () => {
    if (selectedProduct && selectedProduct.id !== undefined) {
      await deleteProduct(selectedProduct.id);
      fetchProducts();
      setIsModalOpen(false);
    }
  }

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setModalType('details');
  }

  return (
    <div>
      <h1 className="text-3xl font-bold leading-tight text-gray-900">
        Product Management
      </h1>
      <button
        onClick={() => openModal("create")}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add New Product
      </button>
      <ul className="mt-6">
        {products.map((product) => (
          <li key={product.id} className="flex justify-between items-center bg-white shadow px-4 py-2 rounded-lg mt-2">
            <span onClick={() => openProductDetails(product)} className="hover:underline cursor-pointer">{product.name}</span>
            <div>
              <button
                onClick={() => openModal("edit", product)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded ml-2"
              >
                Update
              </button>
              <button
                onClick={() => openModal("delete", product)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {
        modalType === 'delete' && selectedProduct ? (
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Confirm Deletion">
         <div>
            <p className="text-lg mb-4">
              Are you sure you want to delete this Product?
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-gray-800 font-semibold">
                <span className="text-blue-600">{selectedProduct?.name}</span>
              </h2>
            </div>
            <div className="flex justify-end items-center p-4 mt-4 border-t border-gray-200">
              <button
                onClick={handleDelete}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-l"
              >
                Yes, delete
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-r ml-2"
              >
                No, go back
              </button>
            </div>
          </div>
          </Modal>
        ) : modalType === 'details' && selectedProduct ? (
            <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedProduct.name}>
                <ProductDetails product={selectedProduct} />
            </Modal>
        ) : (
            <ProductForm
                isOpen={isModalOpen}
                onClose={closeModal}
                modalType={modalType}
                product={selectedProduct}
                refreshProducts={fetchProducts}
            />
        )
      }
    </div>
  );
}