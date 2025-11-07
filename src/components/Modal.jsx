import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ open, onClose, children, className = '' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null
  return createPortal(
    <div
      className="fixed inset-0 z-[999] grid place-items-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className={`relative mx-3 max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-[#0b0b0b] border border-white/10 shadow-2xl ${className}`}>
        <button
          onClick={onClose}
          className="absolute right-3 top-3 h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-white/20"
          aria-label="Close"
        >✕</button>
        {children}
      </div>
    </div>,
    document.body
  )
}
