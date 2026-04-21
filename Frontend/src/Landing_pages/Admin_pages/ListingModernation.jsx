import Sidebar from "./listing/Sidebar";
import Topbar from "./listing/Topbar";
import FiltersBar from "./listing/FiltersBar";
import StatsPanel from "./listing/StatsPanel";
import ListingCard from "./listing/ListingCard";
import Pagination from "./listing/Pagination";
import FloatingActionButton from "./listing/FloatingActionButton";
const listings = [
  {
    id: 1,
    title: "The Obsidian Penthouse",
    location: "Reykjavik, Iceland • Urban Loft",
    price: 1450,
    status: "pending",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4YisJb1-hJkByztcxTZvGHN6owsVpXzuKPp6KZZyArsIGg6RJVCb4m4rSk2kFyBr6vZNRHu2-w2vAmdfl3onzrf4GAPEsgghtMWkB98xSqTT-f9y3xftdlMLth4WBP-UmWkkzNEEU3ZkZW2xcXXwHtTzXW5M4_oL1peWCaNioEjr-pUgg8xV8wP3qGWLRY7aWk0fuJSCafyjDR7g76icasbM2xCMLfodK283Fff5UKqYQU0ifI84SKNR8aApForqvyMXyBaJeVHCc",
  },
  {
    id: 2,
    title: "Azure Cliff Villa",
    location: "Dubai, UAE • Luxury Villa",
    price: 2100,
    status: "flagged",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjgSn0degxMCramx3-qo4MeiT9g7v_1OT2AB0OKZhi_lgwzHpjFX1gux142efLrAl_B1WzA0UCx-9Ctq8Hdv-UfO-z60stAaxPrlNsoQEU540P7zmbn5M9TOssg_We_5pijiOXvJJYNjje6gdJqJF1O_ib1LR0dxdCr3c2EmtFd9AobUuDt1mWS7qn48NQicOyuhql7aGjHm1qbo3PT7wfnNtjuq_pQsvrS0VCx_wxV_Q7ndShDQ_xc-FRbiW_ES8u_P21r1hTO36s",
  },
  {
    id: 3,
    title: "Midnight Sanctuary",
    location: "Tokyo, Japan • Luxury Suite",
    price: 980,
    status: "active",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAfvPdB3rJryiZrJnvgByGy4-GD7eBa-tssNgRawkeriipvGExqvauNWKtiwA1YraSjQVOxCdBMotGKTv1PBVoPGVki301sz0JuBw2sTn7fnvPEsc7gsbgjkzTo2D3x3gdAZyhtpG8gQBazisdFKSfl1DiSfb98mHocZ9qzc7MQaLFDh_N8WQu8551RpN1pP98iqEkfBkAVf-u_n3DV86Y2iqoWeQk9PNzozjfF_3tTmEi3dwnbk7ZhA02wtvfIMbD_CsDJCp7imhpz",
  },
  {
    id: 4,
    title: "The Glacial Pavilion",
    location: "Tromsø, Norway • Private Villa",
    price: 2400,
    status: "pending",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCa9ZHsrCvkqykPqBIM__ZLubhNPTzHClJ7eUQ4Lsvv3S0DqgshTknqCRdjT_dmerpwQTBPykASnGiVmLIlNbHhCf0b_YobylSlO8DbKA7V33PNxNp7Oy5wlckizZMJtq1k_iuRIgWEN6aOg-iHOoS0jSfUvncEChQtYNeNyuJuKM1toTvQi0Ioon6Iw3GGwIe2QsD1dh55KmJ2wmLzJkFxpWxS74zl0LGeTxEhqpzxIUFJwe9c1_nftjdnov1cZ-JO7c1DDHrlgs04",
  },
];

export default function ListingModeration() {
  return (
    <div className="bg-slate-950 min-h-screen text-white flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Topbar */}
        <Topbar />

        <main className="pt-24 px-10 pb-16">
          {/* Header */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Listing Moderation
              </h1>
              <p className="text-slate-400 mt-2 max-w-xl">
                Review, approve, and manage property listings across the system.
              </p>
            </div>
          </div>

          {/* Filters */}
          <FiltersBar />

          {/* Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Listings */}
            <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {listings.map((item) => (
                <ListingCard key={item.id} data={item} />
              ))}
            </div>

            {/* Stats */}
            <div className="space-y-6">
              <StatsPanel />
            </div>
          </div>

          {/* Pagination */}
          <Pagination />
        </main>
      </div>

      {/* Floating Button */}
      <FloatingActionButton />
    </div>
  );
}