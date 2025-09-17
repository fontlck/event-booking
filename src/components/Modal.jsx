import React from 'react'

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-[#101010] text-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#9096d9]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#9096d9]">
          <h2 className="text-xl font-bold text-[#ceff00]">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-[#9096d9] hover:text-[#ceff00] text-lg"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}
