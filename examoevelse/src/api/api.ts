import axios from 'axios';
import { Product } from '../interface/interface';
const API_URL = 'http://localhost:8080/api';

export function getProducts(){
    return axios.get(`${API_URL}/product`);
}

export function getProduct(id: number){
    return axios.get(`${API_URL}/product/${id}`);
}

export function createProduct(product: Product){
    return axios.post(`${API_URL}/product`, product);
}

export function updateProduct(product: Product){
    return axios.put(`${API_URL}/product/${product.id}`, product);
}

export function deleteProduct(id: number){
    return axios.delete(`${API_URL}/product/${id}`);
}