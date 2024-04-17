import { Van } from "../interfaces/interface";
import { useState } from "react";

interface VanSelectorProps {
    onAssign: (selectedVanId: number) => void;
    vans: Van[];
}

export default function VanSelector({ onAssign, vans }: VanSelectorProps) {
  const [selectedVanId, setSelectedVanId] = useState<number | null>(null);

  const handleVanSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVanId(parseInt(e.target.value));
  };

  const handleAssignClick = () => {
    if (selectedVanId !== null) {
      onAssign(selectedVanId);
    }
  };

  return (
    <div>
      <select value={selectedVanId === null ? "" : selectedVanId} onChange={handleVanSelect}>
        <option value="">Select a Van</option>
        {vans.map((van) => (
            <option key={van.id} value={van.id}>
            {van.brand} {van.model} - Capacity: {van.capacity}
        </option>
))}
      </select>
      <button onClick={handleAssignClick}>Assign to Van</button>
    </div>
  );
}