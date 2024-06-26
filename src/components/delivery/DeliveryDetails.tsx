import { getProducts } from "../../api/api";
import { Delivery, Product } from "../../interfaces/interface";
import { useEffect, useState } from "react";
import { calculateTotalPriceAndWeight } from "./DeliveryUtils";

interface DeliveryDetailsProps {
  delivery: Delivery;
}

export default function DeliveryDetails({ delivery }: DeliveryDetailsProps) {
  const deliveryDate = new Date(delivery.deliveryDate);
  const [products, setProducts] = useState<Product[]>([]);

  const { totalPrice, totalWeight } = calculateTotalPriceAndWeight(delivery.productOrders, products);

  const fetchProducts = async () => {
    const response = await getProducts();
    setProducts(response);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getProductNameById = (productId: number): string => {
    const product = products.find((product) => product.id === productId);
    return product?.name || "";
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h1 className="text-lg leading-6 font-medium text-gray-900">Delivery Details</h1>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-5000">Delivery date</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{deliveryDate.toISOString().split("T")[0]}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">From warehouse:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{delivery.fromWareHouse}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Destination:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{delivery.destination}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Product orders:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul>
                {delivery.productOrders.map((order, index) => (
                  <li key={index}>
                    {getProductNameById(order.productId)}, Quantity: {order.quantity}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Total Price:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{totalPrice.toFixed(2)} DKK</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Total Weight:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{(totalWeight / 1000).toFixed(2)} kg</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
