"use client";

import React, { useState } from 'react';

export default function SharkPopup() {
  const [showPopup, setShowPopup] = useState(true);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-96 p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex flex-col items-center text-center">
          <img
            src="/shark-cute.png"
            alt="Shark"
            className="mb-4 w-24 h-24"
          />
          <h2 className="text-xl font-semibold text-blue-600">Hello there!</h2>
          <p className="mt-2 text-gray-600">
            Complete tasks and attend meetings on time to earn more XP!
          </p>
        </div>
      </div>
    </div>
  );
}