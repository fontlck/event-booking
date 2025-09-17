import React from "react";
import dayjs from "../utils_time";

export default function Upcoming({ events = [], models = [] }) {
  const today = dayjs();
  const upcoming = [...events]
    .filter(
      (e) =>
        dayjs(e.startDate).isSame(today, "month") ||
        dayjs(e.startDate).isAfter(today)
    )
    .sort((a, b) => (a.startDate || "").localeCompare(b.startDate))
    .slice(0, 5);

  // ฟังก์ชัน format วันที่ (สั้น)
  function formatDateRange(start, end) {
    const s = dayjs(start);
    const e = end ? dayjs(end) : null;

    if (e && !s.isSame(e, "day")) {
      if (s.year() === e.year()) {
        return `${s.format("DD MMM")} - ${e.format("DD MMM YYYY")}`;
      } else {
        return `${s.format("DD MMM YYYY")} - ${e.format("DD MMM YYYY")}`;
      }
    } else {
      return s.format("DD MMM YYYY");
    }
  }

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
        {upcoming.map((e) => {
          const model = models.find(
            (m) => m.name?.trim().toLowerCase() === (e.model || "").trim().toLowerCase()
          );
          const bg = model?.colorBG || e.colorBG || "#1a1a1a";
          const text = model?.colorText || e.colorText || "#ffffff";

          return (
            <li
              key={e.id || e.eventName}
              className="flex items-center justify-between p-3 rounded-xl"
              style={{ backgroundColor: bg, color: text }}
            >
              <div>
                {/* Event Name */}
                <div className="font-bold text-base truncate">{e.eventName}</div>
                {/* Location */}
                <div className="text-sm opacity-80">{e.location}</div>
                {/* Model */}
                {e.model && (
                  <div className="text-xs opacity-70">Model: {e.model}</div>
                )}
              </div>
              {/* Date */}
              <div className="text-sm font-medium">
                {formatDateRange(e.startDate, e.endDate)}
              </div>
            </li>
          );
        })}

        {upcoming.length === 0 && (
          <div className="text-sm text-center py-2" style={{ color: "#9096d9" }}>
            No upcoming events
          </div>
        )}
      </ul>
    </div>
  );
}
