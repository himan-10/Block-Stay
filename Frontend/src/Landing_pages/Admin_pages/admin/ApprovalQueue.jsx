import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function ApprovalQueue() {
  const [items, setItems] = useState([]);
  const { api } = useContext(AuthContext);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await api.get('/admin/listings/pending');
        setItems(data); // Backend now limits to 10 automatically
      } catch (e) {
        console.error("Failed to fetch approval queue", e);
      }
    };
    fetchRooms();
  }, [api]);
  // Removed static items list

  return (
    <div className="bg-slate-900 p-6 rounded-xl">
      <h3 className="font-bold mb-4">Approval Queue</h3>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-slate-400">Loading queue...</p>
        ) : items.map((i) => (
          <div
            key={i._id || i.name}
            className="p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700 font-medium"
          >
            {i.name}
          </div>
        ))}
      </div>
    </div>
  );
}