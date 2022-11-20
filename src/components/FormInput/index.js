import React from 'react';

export default function Index({ label, name, value, onChange, placeholder }) {
  return (
    <div className="relative gap-2 flex flex-col">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-64 lg:w-96 px-4 py-3 text-sm font-medium border border-gray-400"
      />
    </div>
  );
}
