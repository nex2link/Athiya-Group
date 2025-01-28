import React from 'react'

function KnowMoreButton() {
  return (
    <div className="flex justify-end mt-6">
      <button className="flex items-center gap-2 px-6 py-2 rounded-2xl hover:bg-gray-100 transition-colors border border-gray-300">
        <span>Know More</span>
        <svg className="w-5 h-5" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="currentColor" />
          <path
            d="M35 50 L65 50 L55 40 M65 50 L55 60"
            fill="none"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}

export default KnowMoreButton