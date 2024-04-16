import { API_URL } from "../settings";
import axios from "axios";
import { Product, Delivery } from "../interfaces/interface";


// Product endpoints
export async function getProducts() {
  const response = await axios.get(`${API_URL}/product`);
  return response.data;
}

export async function getProductsById(id: string) {
  const response = await axios.get(`${API_URL}/product/${id}`);
  return response.data;
}

export async function getProductsByName(name: string) {
  const response = await axios.get(`${API_URL}/product/${name}`);
  return response.data;
}

export async function createProduct(product: Product) {
  const response = await axios.post(`${API_URL}/product`, product);
  return response.data;
}

export async function updateProduct(id: string, product: Product) {
  const response = await axios.put(`${API_URL}/product/${id}`, product);
  return response.data;
}

export async function deleteProduct(id: string) {
  const response = await axios.delete(`${API_URL}/product/${id}`);
  return response.data;
}

// Delivery endpoints
export async function getDeliveries() {
  const response = await axios.get(`${API_URL}/delivery`);
  return response.data;
}

export async function getDeliveriesById(id: string) {
  const response = await axios.get(`${API_URL}/delivery/${id}`);
  return response.data;
}

export async function createDelivery(delivery: Delivery) {
  const response = await axios.post(`${API_URL}/delivery`, delivery);
  return response.data;
}

export async function updateDelivery(id: string, delivery: Delivery) {
  const response = await axios.put(`${API_URL}/delivery/${id}`, delivery);
  return response.data;
}

export async function deleteDelivery(id: string) {
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
