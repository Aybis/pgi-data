import React from 'react';

export default function Index({ heading }) {
  return (
    <div className="relative border-b border-gray-300 pb-4">
      <h1 className="text-3xl font-bold text-gray-800">{heading}</h1>
    </div>
  );
}
