import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Recommended = () => {
  const [recommended, setRecommended] = useState([]);
  const { api } = useContext(AuthContext);

  useEffect(() => {
    const fetchTops = async () => {
      try {
        const { data } = await api.get('/rooms');
        setRecommended(data.slice(0, 2)); // take top 2 rooms
      } catch (e) {
        console.error(e);
      }
    };
    fetchTops();
  }, [api]);

  return (
    <section>
      <h3 className="text-2xl font-bold mb-6">
        Recommended For You
      </h3>

      <div className="grid md:grid-cols-4 gap-6">
        {recommended.length > 0 ? recommended.map((room, i) => (
          <div key={i} className="md:col-span-2 bg-slate-800 rounded-3xl overflow-hidden">
            <img
              src={room.images?.[0] || "https://lh3.googleusercontent.com/aida-public/AB6AXuCEN--UQSIlWmZNyxjX2npXyU8OzENK_AysGAOIRby-B2_EbclSQ6V9e0R81c0i96Yu1YB42XA8JrU7CQvG-iwXpBo4Jub3xc6F8Z-RD4igJ9w1JNX28PFiIq8Iw8_2hzeluzBFYHV7G2rXLaIwcqGXK2lqf9Aio7Hgk6mAOndDYhhhxiiEEa5wxExGXUUf02tXN5ngXKO-EQ7OcPau-nl4dMwOagV1AGMWO5ebEcFIlIA87eJBoJYYAHkhYthY1TUMcVOZGD2EumDU"}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 text-white font-bold flex justify-between">
              <span>{room.name}</span>
              <span className="text-violet-400">₹{room.pricePerMonth} / month</span>
            </div>
          </div>
        )) : (
          <div className="text-slate-400">Loading recommendations...</div>
        )}
      </div>
    </section>
  );
};

export default Recommended;