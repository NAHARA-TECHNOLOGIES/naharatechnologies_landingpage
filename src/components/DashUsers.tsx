'use client';

import { useEffect, useState } from 'react';
import { FaCheck, FaTimes, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import {jwtDecode} from 'jwt-decode';
import Image from 'next/image';

interface DecodedToken {
  userName: string;
  userMongoId: string;
  role: 'ADMIN' | 'USER';
}

interface User {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
  createdAt: string;
  isAdmin: boolean;
}

export default function DashUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [decodedUser, setDecodedUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setDecodedUser(decoded);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/user/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            userMongoId: decodedUser?.userMongoId,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setFiltered(data.users);
        }
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (decodedUser?.role === 'ADMIN') {
      fetchUsers();
    }
  }, [decodedUser?.role]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFiltered(users);
    } else {
      setFiltered(
        users.filter((u) =>
          u.username.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, users]);

  if (decodedUser && decodedUser.role !== 'ADMIN') {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-300">
          Access Denied 🚫
        </h1>
        <p className="text-gray-500 mt-2">
          Only administrators can access this page.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#0A2640] dark:text-[#1B9C85]">
          👥 User Management
        </h1>

        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
              focus:ring-2 focus:ring-[#1B9C85] dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-xl">
        {loading ? (
          <div className="animate-pulse space-y-4 p-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"
              ></div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <motion.table
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <thead className="bg-[#0A2640] text-white dark:bg-[#1B9C85]">
              <tr>
                <th className="py-3 px-6 text-left">Date Created</th>
                <th className="py-3 px-6 text-left">User Image</th>
                <th className="py-3 px-6 text-left">Username</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Admin</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="py-3 px-6">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6">
                    <Image
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-10 h-10 object-cover rounded-full border-2 border-[#1B9C85]"
                    />
                  </td>
                  <td className="py-3 px-6 font-medium">{user.username}</td>
                  <td className="py-3 px-6 text-gray-600 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="py-3 px-6">
                    {user.isAdmin ? (
                      <FaCheck className="text-[#1B9C85]" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No users found 😕
          </div>
        )}
      </div>
    </div>
  );
}
