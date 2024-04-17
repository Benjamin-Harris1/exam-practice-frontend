  import { Product, ProductOrder } from "../../interfaces/interface";
  
  // Calculate total price and weight of delivery
  export const calculateTotalPriceAndWeight = (productOrders: ProductOrder[], products: Product[]) => {
    let totalPrice = 0;
    let totalWeight = 0;

    productOrders.forEach(order => {
      const product = products.find(p => p.id === order.productId);
      if (product) {
        totalPrice += (product.price || 0) * order.quantity;
        totalWeight += (product.weight || 0) * order.quantity;
      }
    })

    return { totalPrice, totalWeight };
  }
