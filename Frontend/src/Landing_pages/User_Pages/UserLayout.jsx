import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Dashboard_Com/Sidebar';
import TopBar from './Dashboard_Com/TopBar';

const UserLayout = () => {
  return (
    <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-[#0b1326] to-black min-h-screen text-white font-sans flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col">
        <TopBar />
        <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
