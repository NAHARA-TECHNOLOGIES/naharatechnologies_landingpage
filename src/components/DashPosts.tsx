'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaEdit, FaExclamationTriangle } from 'react-icons/fa';
import {jwtDecode} from 'jwt-decode';
import Link from 'next/link';
import Image from 'next/image';

interface DecodedToken {
  userName: string;
  userMongoId: string;
  role: 'ADMIN' | 'USER';
}

interface Post {
  _id: string;
  title: string;
  image: string;
  slug: string;
  category: string;
  updatedAt: string;
}

export default function DashPosts() {
  const [decodedUser, setDecodedUser] = useState<DecodedToken | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<string>('');
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
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/post/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            userId: decodedUser?.userMongoId,
          }),
        });
        const data = await res.json();
        if (res.ok) setUserPosts(data.posts);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (decodedUser?.role === 'ADMIN') fetchPosts();
  }, [decodedUser?.role, decodedUser?.userMongoId]);

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch('/api/post/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          postId: postIdToDelete,
          userId: decodedUser?.userMongoId,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
        setPostIdToDelete('');
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
    <div className="p-6 w-full overflow-x-auto">
      <h1 className="text-2xl font-bold mb-6 text-[#0A2640] dark:text-[#1B9C85]">
        📰 Manage Posts
      </h1>

      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      ) : userPosts.length > 0 ? (
        <motion.table
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-w-full border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg"
        >
          <thead className="bg-[#0A2640] text-white dark:bg-[#1B9C85]">
            <tr>
              <th className="px-6 py-3 text-left">Date Updated</th>
              <th className="px-6 py-3 text-left">Post Image</th>
              <th className="px-6 py-3 text-left">Post Title</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userPosts.map((post) => (
              <tr
                key={post._id}
                className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="px-6 py-3">{new Date(post.updatedAt).toLocaleDateString()}</td>
                <td className="px-6 py-3">
                  <Link href={`/post/${post.slug}`}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      className="w-20 h-10 rounded-md object-cover border border-gray-300 dark:border-gray-600"
                    />
                  </Link>
                </td>
                <td className="px-6 py-3 font-medium text-gray-800 dark:text-gray-200">
                  <Link href={`/post/${post.slug}`}>{post.title}</Link>
                </td>
                <td className="px-6 py-3 text-gray-500 dark:text-gray-400">{post.category}</td>
                <td className="px-6 py-3 flex items-center gap-4">
                  <button
                    onClick={() => {
                      setPostIdToDelete(post._id);
                      setShowModal(true);
                    }}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Delete Post"
                  >
                    <FaTrash />
                  </button>
                  <Link
                    href={`/dashboard/update-post/${post._id}`}
                    className="text-teal-500 hover:text-teal-600 transition"
                    title="Edit Post"
                  >
                    <FaEdit />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          You have no posts yet 😕
        </p>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 max-w-sm w-full"
            >
              <div className="text-center">
                <FaExclamationTriangle className="text-yellow-500 text-5xl mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  Confirm Deletion
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Are you sure you want to delete this post? This action cannot be undone.
                </p>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleDeletePost}
                    className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-5 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
