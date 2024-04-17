import  { useState } from 'react';
import { ProductList } from '../product/ProductList';
import { DeliveryList } from '../delivery/DeliveryList';

export default function AdminPage() {


  const getInitialTab = (): 'products' | 'deliveries' => {
    return 'products'; // default starting tab
  };

  const [activeTab, setActiveTab] = useState<'products' | 'deliveries'>(getInitialTab());

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4 max-w-full m-auto justify-center sm:flex-nowrap">

        <button
        onClick={() => setActiveTab('products')}
        className={`flex-1 py-2 px-4 font-bold ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-l`}
        >
        Products
        </button>
        <button
        onClick={() => setActiveTab('deliveries')}
        className={`flex-1 py-2 px-4 font-bold ${activeTab === 'deliveries' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-r`}
        >
        Deliveries
        </button>
      </div>
      {activeTab === 'products' && <ProductList />}
      {activeTab === 'deliveries' && <DeliveryList />}
    </div>
  );
}
