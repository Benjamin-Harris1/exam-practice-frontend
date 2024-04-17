import { useState, useEffect } from 'react';
import { Product } from '../../interfaces/interface';
import { createProduct, updateProduct } from '../../api/api';
import InputField from '../InputField';
import Modal from '../Modal';

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  modalType: 'create' | 'edit' | 'delete' | 'details';
  product?: Product | null;
  refreshProducts: () => void;
}

export default function ProductForm({ isOpen, onClose, modalType, product, refreshProducts }: ProductFormProps) {
  const [formData, setFormData] = useState<Product>({
    name: product?.name || '',
    price: product?.price || 0,
    weight: product?.weight || 0,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        weight: product.weight,
      });
    } else {
      // Reset form data if there's no product (e.g., creating a new product)
      setFormData({
        name: '',
        price: 0,
        weight: 0,
      });
    }
  }, [product]); // Depend on the product prop

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    // Correctly handle number inputs
    const parsedValue = type === 'number' ? parseFloat(value) || 0 : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === 'create') {
      await createProduct(formData);
    } else if (modalType === 'edit' && product?.id) {
      await updateProduct(product.id, formData);
    }
    refreshProducts();
    onClose(); // Close modal after operation
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${modalType.charAt(0).toUpperCase() + modalType.slice(1)} Product`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
        />
        <InputField
          label="Price in DKK"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <InputField
          label="Weight in grams"
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Weight"
        />
        <div className="flex justify-end space-x-2">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
        </div>
      </form>
    </Modal>
  );
}

