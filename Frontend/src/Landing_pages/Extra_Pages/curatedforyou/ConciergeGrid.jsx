import ConciergePickCard from "./ConciergePickCard";

export default function ConciergeGrid() {
  return (
    <div className="grid md:grid-cols-12 gap-6">

      <div className="md:col-span-8">
        <ConciergePickCard
          type="large"
          tag="Sanctuary"
          title="The Obsidian Penthouse"
          desc="A floating luxury escape above the city."
          image="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"
        />
      </div>

      <div className="md:col-span-4">
        <ConciergePickCard
          type="small"
          tag="Perk"
          title="Midnight Transfer"
          desc="Private electric chauffeur service."
          image="https://images.unsplash.com/photo-1502877338535-766e1452684a"
        />
      </div>

    </div>
  );
}