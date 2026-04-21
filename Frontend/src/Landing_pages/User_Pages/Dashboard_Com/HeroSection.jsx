import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const HeroSection = () => {
  const [featured, setFeatured] = useState(null);
  const { api } = useContext(AuthContext);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get('/rooms');
        if (data && data.length > 0) {
          setFeatured(data[0]);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchFeatured();
  }, [api]);
  return (
    <div className="lg:col-span-2 relative h-[400px] rounded-3xl overflow-hidden">
      <img
        src={featured?.images?.[0] || "https://lh3.googleusercontent.com/aida-public/AB6AXuAB46FpSbeag3Fa3XbE1Y_-K1g24i6zW4rYiUFI9A1Y2K6Yc3-EHzmesFKP2CQEFHHjXZ39a2yHAd-2Gx5Cy6FnwgyrH1Rx1efr7DKXJ963XFjoJLUXmTjuPjOzp6HwhJFfIatfAY4aZHwIUUtlmcpvBpNrVd0fWObwRdItzZM4Gc0U-nCJ4SoH0u-cu--ATFhI62w0CteSyaybocNwJZk1h-Sg4xd5kvokuWUpbwyjdTELSSSRXbXjb72mTqrEDT7akS0LFnlNLRT7"}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent w-full">
        <h3 className="text-3xl text-white font-bold">
          {featured?.name || "Aman Tokyo Executive Suite"}
        </h3>
      </div>
    </div>
  );
};

export default HeroSection;