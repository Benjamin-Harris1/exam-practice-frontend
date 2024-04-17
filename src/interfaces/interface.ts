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
}

export interface ProductOrder {
    id?: number;
    productId: number;
    quantity: number;
}

