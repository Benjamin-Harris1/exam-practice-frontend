import { useEffect, useState } from "react";
import { Delivery, Van } from "../../interfaces/interface";
import { getDeliveries, getVans } from "../../api/api";
import DeliveryDetails from "./DeliveryDetails";
import VanDetails from "../van/VanDetails";
import Modal from "../Modal";

export default function AssignedDeliveries() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vans, setVans] = useState<Van[]>([]);
  const [selectedVan, setSelectedVan] = useState<Van | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const deliveriesResponse = await getDeliveries();
      const vansResponse = await getVans();
      const assignedDeliveries = deliveriesResponse.filter((delivery: Delivery) => delivery.vanId !== 0);
      setDeliveries(assignedDeliveries);
      setVans(vansResponse);
    };

    fetchData();
  }, []);

  const openModalWithDetails = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    setIsModalOpen(true);
  };

  const openVanDetailsModal = (vanId: number, event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation(); // Prevent triggering the delivery details modal
    const van = vans.find((van) => van.id === vanId);
    if (van) {
      setSelectedVan(van);
      setSelectedDelivery(null); // Ensure delivery details are not shown
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDelivery(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold leading-tight text-gray-900">Assigned Deliveries</h1>
      <ul className="mt-6">
        {deliveries.map((delivery) => (
          <li
            key={delivery.id}
            className="flex justify-between items-center bg-white shadow px-4 py-2 rounded-lg mt-2"
            onClick={() => openModalWithDetails(delivery)}
          >
            <span className="hover:underline cursor-pointer">{delivery.destination}</span>
            <span className="hover:underline cursor-pointer" onClick={(e) => openVanDetailsModal(delivery.vanId || 0, e)}>
              {vans.find((van: Van) => van.id === delivery.vanId)?.brand} {vans.find((van: Van) => van.id === delivery.vanId)?.model}
            </span>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={"Details"}>
          {selectedDelivery && <DeliveryDetails delivery={selectedDelivery} />}
          {selectedVan && !selectedDelivery && <VanDetails van={selectedVan} />}
        </Modal>
      )}
    </div>
  );
}
