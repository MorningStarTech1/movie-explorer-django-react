import React from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-blue-700 text-white p-4 shadow-md flex items-center justify-between">
        <h1 className="text-2xl font-bold">🎬 Movie Explorer</h1>

        <div className="flex items-center gap-3">
          <span className="text-lg font-medium">Carlos</span>
          <div className="w-10 h-10 rounded-full bg-white text-blue-700 flex items-center justify-center font-bold shadow">
            C
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-6">{children}</main>

      <footer className="bg-gray-800 text-gray-300 p-4 text-center">
        Built with Django + React + Vite | Counterpart Test Project
      </footer>
    </div>
  );
};
