import { Van, Delivery } from "../../interfaces/interface";
import { useState } from "react";

interface VanSelectorProps {
    onAssign: (selectedVanId: number) => void;
    vans: Van[];
    delivery: Delivery;
}

export default function VanSelector({ onAssign, vans, delivery }: VanSelectorProps) {
  const [selectedVanId, setSelectedVanId] = useState<number | null>(null);

  const handleVanSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value); // Always specify the radix, 10 for decimal
    if (isNaN(value)) {
      setSelectedVanId(null); // Set to null if the parsed value is NaN
    } else {
      setSelectedVanId(value);
    }
  };

  const handleAssignClick = () => {
    if (selectedVanId !== null) {
      onAssign(selectedVanId);
    }
  };

  const deliveryDate = new Date(delivery.deliveryDate);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h1 className="text-lg leading-6 font-medium text-gray-900">Assign Delivery to Van</h1>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Delivery Date:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{deliveryDate.toISOString().split("T")[0]}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Destination:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{delivery.destination}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">From Warehouse:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{delivery.fromWareHouse}</dd>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <select 
              className="form-select mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={selectedVanId === null ? "" : selectedVanId} 
              onChange={handleVanSelect}>
              <option value="">Select a Van</option>
              {vans.map((van) => (
                  <option key={van.id} value={van.id}>
                  {van.brand} {van.model} - Remaining Capacity: {van.remainingCapacity}kg
                  </option>
              ))}
            </select>
            <button 
              onClick={handleAssignClick} 
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Assign to Van
            </button>
          </div>
        </dl>
      </div>
    </div>
  );
}