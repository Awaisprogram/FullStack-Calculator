'use client';

import { useState } from 'react';
import {
  Addition,
  Subtraction,
  Multiplication,
  Division,
} from '../api';

export default function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const handleOperation = async (operation: string) => {
    setError('');
    setResult(null);

    try {
      const a = Number(num1);
      const b = Number(num2);

      let response;

      if (operation === 'add') response = await Addition(a, b);
      else if (operation === 'subtract') response = await Subtraction(a, b);
      else if (operation === 'multiply') response = await Multiplication(a, b);
      else if (operation === 'divide') response = await Division(a, b);
      else throw new Error('Invalid operation');

      setResult(response.result);

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Calculator (Next.js + FastAPI)</h1>

      <div className="flex space-x-4 mb-6">
        <input
          type="number"
          placeholder="Number 1"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Number 2"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleOperation('add')}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
        <button
          onClick={() => handleOperation('subtract')}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Subtract
        </button>
        <button
          onClick={() => handleOperation('multiply')}
          className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
        >
          Multiply
        </button>
        <button
          onClick={() => handleOperation('divide')}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Divide
        </button>
      </div>

      {result !== null && (
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Result: {result}</h2>
      )}

      {error && (
        <p className="text-red-600 font-medium">{error}</p>
      )}
    </main>
  );
}
