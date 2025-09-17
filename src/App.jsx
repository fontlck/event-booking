import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import EventForm from "./components/EventForm";
import ModelForm from "./components/ModelForm";
import Calendar from "./components/Calendar";
import Stats from "./components/Stats";
import Upcoming from "./components/Upcoming";
import MonthlyTable from "./components/MonthlyTable";
import { EventsAPI, ModelsAPI } from "./api";
import dayjs from "./utils_time";

export default function App() {
  const [events, setEvents] = useState([]);
  const [models, setModels] = useState([]);
  const [month, setMonth] = useState(dayjs().format("YYYY-MM-01"));
  const [openEvent, setOpenEvent] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [editing, setEditing] = useState(null);

  async function load() {
    try {
      const [ev, md] = await Promise.all([EventsAPI.list(), ModelsAPI.list()]);
      setEvents(ev?.data || ev || []);
      setModels(md?.data || md || []);
    } catch (e) {
      console.warn("API not reachable, using empty lists", e);
      setEvents([]);
      setModels([]);
    }
  }
  useEffect(() => {
    load();
  }, []);

  async function saveEvent(payload) {
    try {
      if (editing?.id) {
        await EventsAPI.update(editing.id, payload);
      } else {
        await EventsAPI.create(payload);
      }
      setOpenEvent(false);
      setEditing(null);
      load();
    } catch (e) {
      alert("บันทึกไม่สำเร็จ: " + e.message);
    }
  }

  async function deleteEvent(e) {
    if (!confirm("ลบงานนี้?")) return;
    try {
      await EventsAPI.remove(e.id);
      load();
    } catch (err) {
      alert("ลบไม่สำเร็จ: " + err.message);
    }
  }

  async function saveModel(payload) {
    try {
      if (payload.id) await ModelsAPI.update(payload.id, payload);
      else await ModelsAPI.create(payload);
      setOpenModel(false);
      load();
    } catch (e) {
      alert("บันทึกไม่สำเร็จ: " + e.message);
    }
  }

  const monthLabel = useMemo(() => dayjs(month).format("MMMM YYYY"), [month]);

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white">
      <Header
        onAddEvent={() => {
          setEditing(null);
          setOpenEvent(true);
        }}
        onAddModel={() => setOpenModel(true)}
      />

      <main className="max-w-6xl mx-auto px-6 py-6 space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            {/* Calendar Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{monthLabel}</h2>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1 rounded-lg border"
                  onClick={() =>
                    setMonth(
                      dayjs(month).subtract(1, "month").format("YYYY-MM-01")
                    )
                  }
                >
                  {"<"}
                </button>
                <button
                  className="px-3 py-1 rounded-lg border"
                  onClick={() => setMonth(dayjs().format("YYYY-MM-01"))}
                >
                  Today
                </button>
                <button
                  className="px-3 py-1 rounded-lg border"
                  onClick={() =>
                    setMonth(dayjs(month).add(1, "month").format("YYYY-MM-01"))
                  }
                >
                  {">"}
                </button>
              </div>
            </div>

            {/* Calendar */}
            <Calendar month={month} events={events} />

            {/* Monthly Events */}
            <MonthlyTable
              events={events}
              month={month}
              onEdit={(e) => {
                setEditing(e);
                setOpenEvent(true);
              }}
              onDelete={deleteEvent}
            />
          </div>

          {/* Stats & Upcoming */}
          <div className="space-y-4">
            <Stats events={events} />
            <Upcoming events={events} />
          </div>
        </div>
      </main>

      {/* Event Modal */}
      <Modal
        open={openEvent}
        title={editing ? "Edit Event" : "Add Event"}
        onClose={() => {
          setOpenEvent(false);
          setEditing(null);
        }}
      >
        {openEvent && (
          <EventForm
            initial={editing || {}}
            models={models || []}
            onSubmit={saveEvent}
            onCancel={() => {
              setOpenEvent(false);
              setEditing(null);
            }}
          />
        )}
      </Modal>

      {/* Model Modal */}
      <Modal
        open={openModel}
        title={"Add Model"}
        onClose={() => setOpenModel(false)}
      >
        {openModel && (
          <ModelForm
            initial={{}}
            onSubmit={saveModel}
            onCancel={() => setOpenModel(false)}
          />
        )}
      </Modal>
    </div>
  );
}
