import React, { useMemo } from 'react'
import dayjs from '../utils_time'

export default function Calendar({ month, events = [] }) {
  const start = dayjs(month).startOf('month')
  const end = dayjs(month).endOf('month')
  const gridStart = start.startOf('week')
  const gridEnd = end.endOf('week')

  const days = useMemo(() => {
    const arr = []
    let d = gridStart
    while (d.isBefore(gridEnd) || d.isSame(gridEnd, 'day')) {
      arr.push(d)
      d = d.add(1, 'day')
    }
    return arr
  }, [month])

  function eventsOn(date) {
    const ds = date.format('YYYY-MM-DD')
    return events.filter(
      (e) =>
        e.startDate &&
        e.startDate <= ds &&
        (e.endDate ? e.endDate >= ds : e.startDate === ds)
    )
  }

  return (
    <div className="grid grid-cols-7 gap-1">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((h) => (
        <div key={h} className="text-center text-xs text-gray-400 py-1">
          {h}
        </div>
      ))}

      {days.map((d, i) => {
        const inMonth = d.month() === start.month()
        const es = eventsOn(d)
        const today = dayjs().isSame(d, 'day')

        return (
          <div
            key={i}
            className={`min-h-[90px] rounded-xl p-2 border 
              ${inMonth ? 'bg-gray-900 text-gray-200' : 'bg-gray-800 text-gray-500'} 
              ${today ? 'border-[#caf419]' : 'border-gray-700'}`}
          >
            {/* วันที่ */}
            <div className="text-sm font-semibold">{d.date()}</div>

            {/* Events */}
            <div className="mt-1 space-y-1">
              {es.slice(0, 3).map((ev) => (
                <div
                  key={ev.id || ev.eventName}
                  className="px-2 py-1 rounded text-xs leading-tight"
                  style={{
                    background: ev.colorBG || '#caf419',
                    color: ev.colorText || '#000'
                  }}
                >
                  <div className="font-semibold">{ev.model || "-"}</div>
                  <div className="truncate">{ev.eventName}</div>
                </div>
              ))}
              {es.length > 3 && (
                <div className="text-[10px] text-gray-400">
                  +{es.length - 3} more
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
