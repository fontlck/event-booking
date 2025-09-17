import React, { useState, useEffect } from "react";

export default function EventForm({ initial = {}, models = [], onSubmit, onCancel }) {
  const [form, setForm] = useState({
    eventName: "",
    location: "",
    mapLink: "",
    model: "",
    startDate: "",
    endDate: "",
    staff: "",
    installDate: "",
    installTime: "",
    openTime: "",
    closeTime: "",
    price: "",
    transportFee: "",
    note: "",
    paidDeposit: "FALSE",
    paidFull: "FALSE",
  });

  useEffect(() => {
    if (initial) setForm((prev) => ({ ...prev, ...initial }));
  }, [initial]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  const inputClass =
    "w-full p-2 rounded bg-[#101010] border border-[#9096d9] text-white focus:outline-none focus:ring-2 focus:ring-[#ceff00]";

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-sm">
      <input
        name="eventName"
        placeholder="Event Name"
        value={form.eventName}
        onChange={handleChange}
        className={inputClass}
        required
      />

      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        className={inputClass}
      />

      <input
        name="mapLink"
        placeholder="Google Map Link"
        value={form.mapLink}
        onChange={handleChange}
        className={inputClass}
      />

      <select
        name="model"
        value={form.model}
        onChange={handleChange}
        className={inputClass}
      >
        <option value="">Select Model</option>
        {Array.isArray(models) &&
          models.map((m) => (
            <option
              key={m.id || m.name}
              value={m.name}
              className="bg-[#101010] text-white"
            >
              {m.name}
            </option>
          ))}
      </select>

      <div className="grid grid-cols-2 gap-2">
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <input
        name="staff"
        placeholder="Staff"
        value={form.staff}
        onChange={handleChange}
        className={inputClass}
      />

      <div className="grid grid-cols-2 gap-2">
        <input
          type="date"
          name="installDate"
          value={form.installDate}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          type="time"
          name="installTime"
          value={form.installTime}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <input
          type="time"
          name="openTime"
          value={form.openTime}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          type="time"
          name="closeTime"
          value={form.closeTime}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className={inputClass}
      />

      <input
        name="transportFee"
        placeholder="Transport Fee"
        value={form.transportFee}
        onChange={handleChange}
        className={inputClass}
      />

      <textarea
        name="note"
        placeholder="Note"
        value={form.note}
        onChange={handleChange}
        className={inputClass}
      />

      <div className="flex gap-6 text-[#9096d9]">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.paidDeposit === "TRUE"}
            onChange={(e) =>
              setForm({
                ...form,
                paidDeposit: e.target.checked ? "TRUE" : "FALSE",
              })
            }
          />
          Deposit Paid
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.paidFull === "TRUE"}
            onChange={(e) =>
              setForm({
                ...form,
                paidFull: e.target.checked ? "TRUE" : "FALSE",
              })
            }
          />
          Full Paid
        </label>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-[#9096d9] text-black rounded hover:bg-[#ceff00]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#ceff00] text-black font-bold rounded hover:bg-[#9096d9] hover:text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
}
