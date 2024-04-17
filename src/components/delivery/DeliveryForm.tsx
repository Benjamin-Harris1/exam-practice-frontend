import { useState, useEffect } from "react";
import { Delivery, Product } from "../../interfaces/interface";
import { createDelivery, updateDelivery, getProducts } from "../../api/api";
import InputField from "../InputField";
import Modal from "../Modal";
import ProductOrdersList from "../productorder/ProductOrderList";
import { calculateTotalPriceAndWeight } from "./DeliveryUtils";

interface DeliveryFormProps {
  isOpen: boolean;
  onClose: () => void;
  modalType: "create" | "edit" | "delete" | "details" | "van";
  delivery?: Delivery | null;
  refreshDeliveries: () => void;
}

export default function DeliveryForm({ isOpen, onClose, modalType, delivery, refreshDeliveries }: DeliveryFormProps) {
  const [formData, setFormData] = useState<Delivery>({
    deliveryDate: delivery?.deliveryDate ? new Date(delivery.deliveryDate) : new Date(),
    destination: delivery?.destination || "",
    fromWareHouse: delivery?.fromWareHouse || "",
    productOrders: delivery?.productOrders || [{ productId: 0, quantity: 0 }],
  });
  const [products, setProducts] = useState<Product[]>([]);
  const { totalPrice, totalWeight } = calculateTotalPriceAndWeight(formData.productOrders, products);

  const handleAddProductOrder = () => {
    setFormData({
      ...formData,
      productOrders: [...formData.productOrders, { productId: 0, quantity: 0 }],
    });
  };

  const handleRemoveProductOrder = (index: number) => {
    const newProductOrders = formData.productOrders.filter((_, i) => i !== index);
    setFormData({ ...formData, productOrders: newProductOrders });
  };

  const handleChangeProductOrder = (index: number, field: string, value: string | number) => {
    const newProductOrders = formData.productOrders.map((order, i) => (i === index ? { ...order, [field]: value } : order));
    setFormData({ ...formData, productOrders: newProductOrders });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      setProducts(response);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (delivery) {
      setFormData({
        deliveryDate: new Date(delivery.deliveryDate),
        destination: delivery.destination,
        fromWareHouse: delivery.fromWareHouse,
        productOrders: delivery.productOrders,
      });
    } else {
      setFormData({
        deliveryDate: new Date(),
        destination: "",
        fromWareHouse: "",
        productOrders: [{ productId: 0, quantity: 0 }],
      });
    }
  }, [delivery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    // Correctly handle number inputs
    const parsedValue = type === "number" ? parseFloat(value) || 0 : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === "create") {
      await createDelivery(formData);
    } else if (modalType === "edit" && delivery?.id) {
      await updateDelivery(delivery.id, formData);
    }
    refreshDeliveries();
    onClose(); // Close modal after operation
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${modalType.charAt(0).toUpperCase() + modalType.slice(1)} Delivery`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Date"
          type="date"
          name="deliveryDate"
          value={formData.deliveryDate.toISOString().split("T")[0]}
          onChange={handleChange}
          placeholder="Delivery Date"
        />
        <InputField
          label="Destination"
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Destination"
        />
        <InputField
          label="From Warehouse"
          type="text"
          name="fromWareHouse"
          value={formData.fromWareHouse}
          onChange={handleChange}
          placeholder="From Warehouse"
        />
        <ProductOrdersList
          productOrders={formData.productOrders}
          products={products}
          handleChangeProductOrder={handleChangeProductOrder}
          handleRemoveProductOrder={handleRemoveProductOrder}
        />
        <div className="mt-4">
          <p>Total Price: {totalPrice.toFixed()} DKK</p>
          <p>Total Weight: {totalWeight.toFixed()} grams</p>
        </div>

        <div className="flex justify-between space-x-2 mt-4">
          <button type="button" onClick={handleAddProductOrder} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add Product Order
          </button>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Save
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
