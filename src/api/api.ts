import { API_URL } from "../settings";
import axios from "axios";
import { Product, Delivery } from "../interfaces/interface";


// Product endpoints
export async function getProducts() {
  const response = await axios.get(`${API_URL}/product`);
  return response.data;
}

export async function getProductsById(id: number) {
  const response = await axios.get(`${API_URL}/product/${id}`);
  return response.data;
}

export async function getProductsByName(name: string) {
  const response = await axios.get(`${API_URL}/product/name/${name}`);
  return response.data;
}

export async function createProduct(product: Product) {
  const response = await axios.post(`${API_URL}/product`, product);
  return response.data;
}

export async function updateProduct(id: number, product: Product) {
  const response = await axios.put(`${API_URL}/product/${id}`, product);
  return response.data;
}

export async function deleteProduct(id: number) {
  const response = await axios.delete(`${API_URL}/product/${id}`);
  return response.data;
}

// Delivery endpoints
export async function getDeliveries() {
  const response = await axios.get(`${API_URL}/delivery`);
  return response.data;
}

export async function getDeliveriesById(id: number) {
  const response = await axios.get(`${API_URL}/delivery/${id}`);
  return response.data;
}

export async function createDelivery(delivery: Delivery) {
  const response = await axios.post(`${API_URL}/delivery`, delivery);
  return response.data;
}

export async function updateDelivery(id: number, delivery: Delivery) {
  const response = await axios.put(`${API_URL}/delivery/${id}`, delivery);
  return response.data;
}

export async function deleteDelivery(id: number) {
  const response = await axios.delete(`${API_URL}/delivery/${id}`);
  return response.data;
}

export async function getDeliveriesForVan(id: number){
    const response = await axios.get(`${API_URL}/delivery/van/${id}`);
    return response.data;
}

export async function assignDeliveryToVan(deliveryId: number, vanId: number){
    const response = await axios.post(`${API_URL}/delivery/${deliveryId}/van/${vanId}`);
    return response.data;
}
