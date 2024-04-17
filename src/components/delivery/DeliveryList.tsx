import { useEffect, useState } from "react";
import { Delivery, Van } from "../../interfaces/interface";
import { assignDeliveryToVan, deleteDelivery, getDeliveries, getVans } from "../../api/api";
import Modal from "../Modal";
import DeliveryForm from "./DeliveryForm";
import DeliveryDetails from "./DeliveryDetails";
import VanSelector from "../van/VanSelector";

export function DeliveryList() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit" | "delete" | "details" | "van">("create");
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [vans, setVans] = useState<Van[]>([]);

  useEffect(() => {
    fetchDeliveries();
    fetchVans();
  }, []);

  useEffect(() => {
    if (isModalOpen && modalType === 'van') {
      fetchVans();
    }
  }, [isModalOpen, modalType]); // ensure van is up to date when assigning deliveries

  const fetchDeliveries = async () => {
    const response = await getDeliveries();
    const unassignedDeliveries = response.filter((delivery: Delivery) => delivery.vanId === 0);
    setDeliveries(unassignedDeliveries);
  };

  const fetchVans = async () => {
    const response = await getVans();
    console.log(response);

    setVans(response);
  };

  const openModal = (type: "create" | "edit" | "delete", delivery?: Delivery) => {
    setIsModalOpen(true);
    setModalType(type);
    setSelectedDelivery(delivery || null);
  };

  const openAssignToVan = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    setIsModalOpen(true);
    setModalType("van");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDelivery(null); // Reset selected product on modal close
    fetchDeliveries(); // Refresh the product list after any operation
  };

  const handleDelete = async () => {
    if (selectedDelivery && selectedDelivery.id !== undefined) {
      await deleteDelivery(selectedDelivery.id);
      fetchDeliveries();
      setIsModalOpen(false);
    }
  };

  const openDeliveryDetails = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    setIsModalOpen(true);
    setModalType("details");
  };

  const handleAssignToVan = async (deliveryId: number, vanId: number) => {
    try {
      await assignDeliveryToVan(deliveryId, vanId);
      alert("Delivery successfully assigned to van.");
      closeModal();
      fetchDeliveries(); // Refresh the deliveries list
    } catch (error) {
      console.error("Failed to assign delivery to van:", error);
      alert("Failed to assign delivery to van.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold leading-tight text-gray-900">Delivery Management</h1>
      <button onClick={() => openModal("create")} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add New Delivery
      </button>
      <ul className="mt-6">
        {deliveries.map((delivery) => (
          <li key={delivery.id} className="flex justify-between items-center bg-white shadow px-4 py-2 rounded-lg mt-2">
            <span onClick={() => openDeliveryDetails(delivery)} className="hover:underline cursor-pointer">
              {delivery.destination}
            </span>
            <div>
              <button
                onClick={() => openModal("edit", delivery)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded ml-2"
              >
                Update
              </button>
              <button
                onClick={() => openModal("delete", delivery)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
              >
                Delete
              </button>
              <button
                onClick={() => openAssignToVan(delivery)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2"
                title="Assign to Van"
              >
                <i className="fas fa-shuttle-van"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
      {modalType === "delete" && selectedDelivery ? (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Confirm Deletion">
          <div>
            <p className="text-lg mb-4">Are you sure you want to delete this delivery?</p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-gray-800 font-semibold mb-2">Delivery Details:</h2>
              <p>
                <strong>Destination:</strong> <span className="text-blue-600">{selectedDelivery?.destination}</span>
              </p>
              <p>
                <strong>From Warehouse:</strong> {selectedDelivery?.fromWareHouse}
              </p>
              <p>
                <strong>Delivery Date:</strong> {selectedDelivery?.deliveryDate && new Date(selectedDelivery.deliveryDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex justify-end items-center p-4 mt-4 border-t border-gray-200">
              <button onClick={handleDelete} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-l">
                Yes, delete
              </button>
              <button onClick={() => setIsModalOpen(false)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-r ml-2">
                No, go back
              </button>
            </div>
          </div>
        </Modal>
      ) : modalType === "details" && selectedDelivery ? (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedDelivery.destination}>
          <DeliveryDetails delivery={selectedDelivery} />
        </Modal>
      ) : modalType === "van" && selectedDelivery ? (
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Assign Delivery to Van">
          {selectedDelivery && (
            <VanSelector
              onAssign={(selectedVanId) => {
                if (selectedDelivery && selectedDelivery.id !== undefined){
                  handleAssignToVan(selectedDelivery.id, selectedVanId);
                  closeModal();
                }
              }}
              vans={vans}
              delivery={selectedDelivery}
            />
          )}
        </Modal>
      ) : (
        <DeliveryForm
          isOpen={isModalOpen}
          onClose={closeModal}
          modalType={modalType}
          delivery={selectedDelivery}
          refreshDeliveries={fetchDeliveries}
        />
      )}
    </div>
  );
}
