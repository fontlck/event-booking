import React, { useState, useEffect } from "react";

export default function ModelForm({ initial = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    size: "",
    colorBG: "#ffffff",
    colorText: "#000000",
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
        name="name"
        placeholder="Model Name"
        value={form.name}
        onChange={handleChange}
        className={inputClass}
        required
      />

      <input
        name="size"
        placeholder="Size"
        value={form.size}
        onChange={handleChange}
        className={inputClass}
      />

      <label className="block text-[#9096d9]">
        BG Color:
        <input
          type="color"
          name="colorBG"
          value={form.colorBG}
          onChange={handleChange}
          className="ml-2"
        />
      </label>

      <label className="block text-[#9096d9]">
        Text Color:
        <input
          type="color"
          name="colorText"
          value={form.colorText}
          onChange={handleChange}
          className="ml-2"
        />
      </label>

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
