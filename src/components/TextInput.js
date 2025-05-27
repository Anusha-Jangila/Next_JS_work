'use client';
import React from 'react';

export default function TextInput({ label, name, placeholder, error, ...rest }) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <input
        name={name}
        placeholder={placeholder}
        className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
        {...rest} // This includes {...register(...)}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

//export default TextInput;