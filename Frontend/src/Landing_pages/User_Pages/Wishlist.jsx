import Navbar from "./myBooking/Navbar";
import BottomNav from "./myBooking/BottomNav";
import WishlistHeader from "./Wishlistpage/WishlistHeader";
import WishlistHeroCard from "./Wishlistpage/WishlistHeroCard";
import WishlistCardVertical from "./Wishlistpage/WishlistCardVertical";
import WishlistCardHorizontal from "./Wishlistpage/WishlistCardHorizontal";
import RecommendedCard from "./Wishlistpage/RecommendedCard";
import CompareButton from "./Wishlistpage/CompareButton";   

export default function Wishlist() {
  return (
    <>
      <Navbar />

      <main className="pt-28 px-6 max-w-7xl mx-auto">
        <WishlistHeader />

        <div className="grid md:grid-cols-12 gap-8">
          <WishlistHeroCard />
          <WishlistCardVertical />

          <WishlistCardHorizontal
            title="Midnight Loft"
            price="420"
            img="https://lh3.googleusercontent.com/aida-public/AB6AXuA1Bl4k8ibrZrvKTV2nUXbeCp4G5Z2SFiNS2ugm7jtjXm1GfzWi7hUnniG31grEFfZOwYh7mWUOtJz0qoWu-1RIspyWx9KQL7_EWfcf1VBiVk-e0w05Y-tjyC-kfhKZgCws0tfK6_slTuCly7amL42M6WiD4C36jJd2Q7aWnEst0bf5Qm_ckh22eUTCaKkB6BYm-TWEV4ZTkdfWlHVTj12I6mh70hH5rg3OF_DKvbyVi32L8O6ofr4ZnPyq2ZS4HDrwVuJIkU8XaSuI"
          />

          <WishlistCardHorizontal
            title="Azure Lagoon"
            price="2100"
            img="https://lh3.googleusercontent.com/aida-public/AB6AXuBBfLaoJfv_jbEH7pSJUKMTkJ9S6WgFAu4Z-XdJKEAPCPVYXqzuSHh7cna0254ipoCv7b3CJ14A5cVtWCD_Tj3_ihg0BUThNo85PhB9l2vq2GSqk9LiuXiakUIZCllltm05u31EdgQzOKAmMIzHAAXJs38Bl_Uux2gYzS9TIsxFO8xx9xULV0ziN5Lqbanb97caO2I64e-N_J7biNRnb8nEY6CC1iuzHdgXrgaRD69eRf5AF0yDAy_aAi0E_Uh-ZM7cki2Dln7eKCLB"
          />
        </div>

        <div className="mt-20 flex gap-6 overflow-x-auto">
          <RecommendedCard title="Zen Spa" price="550" img="..." />
          <RecommendedCard title="Cabin" price="720" img="..." />
          <RecommendedCard title="Penthouse" price="1050" img="..." />
        </div>
      </main>

      <CompareButton />
      <BottomNav />
    </>
  );
}