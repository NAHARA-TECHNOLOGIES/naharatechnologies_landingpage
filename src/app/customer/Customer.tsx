'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiArrowLeft } from 'react-icons/fi';
import Image from 'next/image';

type Customer = {
  id: string;
  name: string;
  image: string;
};

const customers: Customer[] = [
  { id: '1', name: 'Jane Doe', image: '/customers/jane.jpg' },
  { id: '2', name: 'John Smith', image: '/customers/john.jpg' },
  { id: '3', name: 'Alice Johnson', image: '/customers/alice.jpg' },
  { id: '4', name: 'Bob Martin', image: '/customers/bob.jpg' },
  { id: '5', name: 'Clara Lee', image: '/customers/clara.jpg' },
];

export default function Customer() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const filteredCustomers = useMemo(() => {
    setLoading(true);
    const results = customers.filter((c) =>
      [c.name].some((field) =>
        field.toLowerCase().includes(query.toLowerCase())
      )
    );
    setLoading(false);
    return results;
  }, [query]);

  return (
    <div className="p-6  min-h-screen">

      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Our Valued Customers</h1>

      <p className="text-center text-gray-600 mb-6">
        We cherish every connection and provide the best experience for our customers worldwide.
      </p>

      {/* Search Bar */}
      <div className="mb-6 max-w-md mx-auto relative">
        <FiSearch className="absolute left-3 top-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, email, or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {/* Loading State */}
      {loading && <p className="text-center text-gray-500">Loading customers...</p>}

      {/* Customer Grid */}
      <div className='container mx-auto px-4 sm:px-6 py-12'>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-white py-4 shadow-md rounded-lg hover:shadow-lg transition-all">
              <Image
                src={customer.image || "/customers/default.jpg"}
                alt={customer.name}
                width={64}  
                height={64}
                className="w-16 h-16 rounded-full mx-auto mb-3"
              />

              <h2 className="text-lg font-bold text-center">{customer.name}</h2>
              
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No customers found.</p>
        )}
      </div>
      </div>
     
    </div>
  );
}
