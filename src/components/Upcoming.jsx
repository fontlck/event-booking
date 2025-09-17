import React from "react";
import dayjs from "../utils_time";

export default function Upcoming({ events = [] }) {
  const today = dayjs();
  const upcoming = [...events]
    .filter(
      (e) =>
        dayjs(e.startDate).isSame(today, "month") ||
        dayjs(e.startDate).isAfter(today)
    )
    .sort((a, b) => (a.startDate || "").localeCompare(b.startDate))
    .slice(0, 5);

  return (
    <div
      className="rounded-2xl p-4 shadow space-y-3"
      style={{ backgroundColor: "#101010" }}
    >
      {/* Title */}
      <div className="font-semibold mb-2 text-lg" style={{ color: "#9096d9" }}>
        Upcoming Events
      </div>

      <ul className="space-y-3">
        {upcoming.map((e) => (
          <li
            key={e.id || e.eventName}
            className="flex items-center justify-between p-3 rounded-xl"
            style={{ backgroundColor: "#1a1a1a" }}
          >
            <div>
              {/* Event Name */}
              <div className="font-bold text-base" style={{ color: "#ceff00" }}>
                {e.eventName}
              </div>
              {/* Location */}
              <div className="text-sm" style={{ color: "#9096d9" }}>
                {e.location}
              </div>
            </div>
            {/* Date */}
            <div className="text-sm" style={{ color: "#d1d1d1" }}>
              {e.startDate}
              {e.endDate ? ` → ${e.endDate}` : ""}
            </div>
          </li>
        ))}

        {upcoming.length === 0 && (
          <div className="text-sm text-center py-2" style={{ color: "#9096d9" }}>
            No upcoming events
          </div>
        )}
      </ul>
    </div>
  );
}
