import React from "react";

export default function Header({ onAddEvent, onAddModel }) {
  return (
    <header className="bg-[#101010] border-b border-[#9096d9]">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-6 px-6">
        {/* Title */}
        <h1
          className="text-[42px] font-extrabold text-center flex-1 text-[#ceff00]"
          style={{ fontFamily: "Archivo Black, sans-serif" }}
        >
          FYM EVENT
        </h1>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onAddModel}
            className="px-4 py-2 rounded-xl bg-[#9096d9] text-black font-semibold shadow hover:bg-[#ceff00] hover:text-black transition"
          >
            Add Model
          </button>
          <button
            onClick={onAddEvent}
            className="px-4 py-2 rounded-xl bg-[#ceff00] text-black font-bold shadow hover:bg-[#9096d9] hover:text-white transition"
          >
            Add Event
          </button>
        </div>
      </div>
    </header>
  );
}
