// src/components/Stats.jsx
import React from "react";

export default function Stats({ events }) {
  const total = events.length;
  const booked = events.filter(
    (e) => e.paidDeposit === "TRUE" || e.paidFull === "TRUE"
  ).length;
  const revenue = events.reduce(
    (sum, e) => sum + (parseFloat(e.price) || 0),
    0
  );

  const cards = [
    { label: "Total Events", value: total },
    { label: "Booked (paid/dep)", value: booked },
    { label: "Sum Revenue (฿)", value: revenue.toLocaleString() },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {cards.map((c, i) => (
        <div
          key={i}
          className="rounded-2xl p-5 text-center border"
          style={{
            backgroundColor: "#101010",
            borderColor: "#9096d9",
          }}
        >
          {/* Title */}
          <p className="text-sm font-medium" style={{ color: "#9096d9" }}>
            {c.label}
          </p>

          {/* Value */}
          <h2
            className={`font-bold ${
              c.label.includes("Revenue") ? "text-2xl" : "text-3xl"
            }`}
            style={{ color: "#ceff00" }}
          >
            {c.value}
          </h2>
        </div>
      ))}
    </div>
  );
}
