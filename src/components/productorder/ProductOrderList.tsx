import React from 'react';
import { ProductOrder, Product } from '../../interfaces/interface';
import InputField from '../InputField';

interface ProductOrdersListProps {
  productOrders: ProductOrder[];
  products: Product[];
  handleChangeProductOrder: (index: number, field: string, value: string | number) => void;
  handleAddProductOrder: () => void;
  handleRemoveProductOrder: (index: number) => void;
}

const ProductOrdersList: React.FC<ProductOrdersListProps> = ({
  productOrders,
  products,
  handleChangeProductOrder,
  handleAddProductOrder,
  handleRemoveProductOrder,
}) => {
  return (
    <div>
      {productOrders && productOrders.map((order, index) => (
        <div key={index} className="flex space-x-2 items-center">
          <select
            value={order.productId.toString()}
            onChange={(e) => handleChangeProductOrder(index, 'productId', parseInt(e.target.value))}
            className="form-select"
          >
            <option value="0">Select Product</option>
            {products && products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <InputField
            type="number"
            name={`quantity-${index}`}
            value={order.quantity.toString()}
            onChange={(e) => handleChangeProductOrder(index, 'quantity', parseInt(e.target.value))}
            placeholder="Quantity"
          />
          <button type="button" onClick={() => handleRemoveProductOrder(index)} className="bg-red-500 text-white p-2 rounded">Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddProductOrder} className="bg-blue-500 text-white p-2 rounded">Add Product Order</button>
    </div>
  );
};

export default ProductOrdersList;