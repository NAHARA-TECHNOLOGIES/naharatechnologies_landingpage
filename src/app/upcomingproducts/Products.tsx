'use client';
export const dynamic = 'force-dynamic'; // 👈 Add this line

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FiSmartphone,
  FiMonitor,
  FiWatch,
  FiCpu,
  FiHeadphones,
  FiDatabase,
  FiCloud,
  FiZap,
  FiBluetooth,
} from 'react-icons/fi';

const products = [
  {
    id: 1,
    name: 'AI-Powered Assistant',
    type: 'Software',
    icon: FiCloud,
    description: 'A smart AI tool that enhances productivity through automation.',
  },
  {
    id: 2,
    name: 'Ultra 4K Smartwatch',
    type: 'Wearable Tech',
    icon: FiWatch,
    description: 'Next-gen smartwatch with health tracking and futuristic features.',
  },
  {
    id: 3,
    name: 'Quantum Laptop Pro',
    type: 'Electronics',
    icon: FiMonitor,
    description: 'A powerful laptop built for AI and quantum computing tasks.',
  },
  {
    id: 4,
    name: 'Next-Gen Smartphone',
    type: 'Mobile Tech',
    icon: FiSmartphone,
    description:
      'A cutting-edge smartphone with AI-enhanced features and a zero-bezel display.',
  },
];

export default function UpcomingProducts() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    alert(`Thank you for joining the waitlist, ${email}!`);
    setWaitlistOpen(false);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-extrabold text-center mb-8">
        Upcoming Products
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 bg-white shadow-md rounded-lg transition-transform hover:scale-105 flex flex-col items-center text-center"
          >
            <product.icon className="text-5xl text-blue-500 mb-3" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-500 text-sm">{product.type}</p>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <button
              className="mt-4 bg-black text-white px-5 py-2 hover:bg-gray-900 transition-colors"
              onClick={() => setWaitlistOpen(true)}
            >
              Join Waitlist
            </button>
          </div>
        ))}
      </div>

      {/* Go Back Home */}
      <div className="text-center mt-10">
        <button
          className="bg-gray-800 text-white px-6 py-3 hover:bg-gray-900"
          onClick={() => router.push('/')}
        >
          Go Back to Home
        </button>
      </div>

      {/* Waitlist Popup */}
      {waitlistOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-sm">
            <h3 className="text-2xl font-semibold mb-4">Join the Waitlist</h3>
            <input
              type="email"
              placeholder="Enter your email"
              className="border p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex gap-4 justify-center mt-4">
              <button
                className="bg-black text-white px-6 py-2"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="bg-gray-300 px-6 py-2"
                onClick={() => setWaitlistOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
