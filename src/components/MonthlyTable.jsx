import React from "react"
import dayjs from "../utils_time"

export default function MonthlyTable({ events = [], onEdit, onDelete, month }) {
  const list = events
    .filter((e) => (e.startDate || "").startsWith(dayjs(month).format("YYYY-MM")))
    .sort((a, b) => (a.startDate || "").localeCompare(b.startDate))

  // ชื่อเดือน EN → UPPERCASE เช่น "SEPTEMBER"
  const monthLabel = dayjs(month).format("MMMM").toUpperCase()

  return (
    <div
      className="rounded-2xl p-4 space-y-4"
      style={{ backgroundColor: "#101010", color: "#ceff00" }}
    >
      <div
        className="font-semibold mb-2 text-lg"
        style={{ color: "#9096d9" }}
      >
        {monthLabel} EVENT
      </div>

      {list.length === 0 && (
        <p className="text-center py-4" style={{ color: "#9096d9" }}>
          ไม่มีงานในเดือนนี้
        </p>
      )}

      {list.map((e) => (
        <div
          key={e.id || e.eventName}
          className="rounded-2xl p-5 flex justify-between items-center"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          {/* ข้อมูลฝั่งซ้าย */}
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2" style={{ color: "#ceff00" }}>
              {e.eventName}
            </h3>
            <p className="text-sm mb-1" style={{ color: "#9096d9" }}>
              วันที่
            </p>
            <p className="text-sm mb-2 text-gray-300">
              {e.startDate}
              {e.endDate ? ` - ${e.endDate}` : ""}
            </p>

            <p className="text-sm mb-1" style={{ color: "#9096d9" }}>
              สถานที่
            </p>
            <p className="text-sm mb-2 text-gray-300">{e.location}</p>

            <p className="text-sm mb-1" style={{ color: "#9096d9" }}>
              Model
            </p>
            <p className="text-sm text-gray-300">{e.model}</p>
          </div>

          {/* ปุ่ม Action */}
          <div className="flex gap-2">
            <button
              onClick={() => onEdit?.(e)}
              className="px-4 py-2 rounded-xl text-sm font-bold"
              style={{ backgroundColor: "#9096d9", color: "#101010" }}
            >
              แก้ไข
            </button>
            <button
              onClick={() => onDelete?.(e)}
              className="px-4 py-2 rounded-xl text-sm font-bold"
              style={{ backgroundColor: "#ceff00", color: "#101010" }}
            >
              ลบ
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
