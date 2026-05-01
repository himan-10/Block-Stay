import { useNavigate } from "react-router-dom";

export default function FloatingButton() {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/admin/listings')}
      className="fixed bottom-8 right-8 w-14 h-14 bg-purple-600 hover:bg-purple-500 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.4)] rounded-full text-white text-2xl flex items-center justify-center z-50"
      title="Manage Listings"
    >
      +
    </button>
  );
}