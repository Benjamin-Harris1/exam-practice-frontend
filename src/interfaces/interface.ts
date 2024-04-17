export interface Product {
    id?: number;
    name: string;
    price: number;
    weight: number;
}

export interface Delivery {
   id?: number;
   deliveryDate: Date;
   fromWareHouse: string;
   destination: string;
   productOrders: ProductOrder[];
   vanId?: number;
}

export interface ProductOrder {
    id?: number;
    productId: number;
    quantity: number;
}

export interface Van {
    id?: number;
    brand: string;
    model: string;
    capacity: number;
    remainingCapacity: number;
    deliveries: Delivery[];
}

