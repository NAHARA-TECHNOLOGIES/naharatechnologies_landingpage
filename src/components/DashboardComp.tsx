'use client';

import { useEffect, useState } from 'react';
import {
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Image from 'next/image';

const NAHARA_BLUE = '#0A2640';
const NAHARA_GREEN = '#1B9C85';

interface User {
  _id: string;
  username: string;
  profilePicture?: string | null;
}

interface Post {
  _id: string;
  title: string;
  image?: string | null;
  category: string;
}

interface ChartData {
  month: string;
  users: number;
  posts: number;
}

const NaharaButton: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <Link
    href={href}
    className={`px-4 py-2 text-sm font-semibold rounded-xl border border-[${NAHARA_GREEN}] text-[${NAHARA_GREEN}] hover:bg-[${NAHARA_GREEN}] hover:text-white transition duration-300`}
  >
    {label}
  </Link>
);

const NaharaTable: React.FC<{
  headers: string[];
  rows: any[];
  renderRow: (row: any) => JSX.Element;
}> = ({ headers, rows, renderRow }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full text-left text-gray-800 dark:text-gray-200">
      <thead
        style={{ backgroundColor: `${NAHARA_BLUE}10`, borderBottom: `1px solid ${NAHARA_GREEN}50` }}
      >
        <tr>
          {headers.map((head, i) => (
            <th
              key={i}
              className="px-4 py-2 font-semibold text-sm uppercase tracking-wide"
            >
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{rows.map(renderRow)}</tbody>
    </table>
  </div>
);

const getUserInitials = (username?: string) => {
  if (!username) return 'U';
  return username.length >= 2
    ? `${username[0]}${username[username.length - 1]}`.toUpperCase()
    : username[0].toUpperCase();
};

export default function DashboardComp() {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const isAdmin = true;

  const [analyticsData, setAnalyticsData] = useState<ChartData[]>([
    { month: 'Jan', users: 50, posts: 40 },
    { month: 'Feb', users: 80, posts: 60 },
    { month: 'Mar', users: 120, posts: 90 },
    { month: 'Apr', users: 160, posts: 100 },
    { month: 'May', users: 200, posts: 150 },
  ]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/get', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ limit: 5 }),
        });
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/get', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ limit: 5 }),
        });
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    };

    if (isAdmin) {
      fetchUsers();
      fetchPosts();
    }
  }, [isAdmin]);

  const DEFAULT_POST_IMAGE = '/placeholder-post.png';

  return (
    <div className="p-4 md:p-8 mx-auto space-y-8 bg-[#F9FAFB] dark:bg-[#0F172A] min-h-screen">
      <div className="flex flex-wrap justify-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col p-5 bg-white dark:bg-[#1E293B] rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:scale-[1.02] transition"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-gray-500 text-sm uppercase">Total Users</h3>
              <p style={{ color: NAHARA_BLUE }} className="text-3xl font-bold mt-1">
                {totalUsers}
              </p>
            </div>
            <HiOutlineUserGroup
              style={{ color: NAHARA_BLUE, backgroundColor: `${NAHARA_BLUE}15` }}
              className="p-3 rounded-full text-5xl"
            />
          </div>
          <div className="flex items-center gap-2 text-sm mt-3 text-[color:var(--nahara-green)]">
            <HiArrowNarrowUp className="text-[color:var(--nahara-green)]" />
            {lastMonthUsers}{' '}
            <span className="text-gray-500 ml-1">Last month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col p-5 bg-white dark:bg-[#1E293B] rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:scale-[1.02] transition"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-gray-500 text-sm uppercase">Total Posts</h3>
              <p style={{ color: NAHARA_GREEN }} className="text-3xl font-bold mt-1">
                {totalPosts}
              </p>
            </div>
            <HiDocumentText
              style={{ color: NAHARA_GREEN, backgroundColor: `${NAHARA_GREEN}15` }}
              className="p-3 rounded-full text-5xl"
            />
          </div>
          <div className="flex items-center gap-2 text-sm mt-3 text-[color:var(--nahara-green)]">
            <HiArrowNarrowUp className="text-[color:var(--nahara-green)]" />
            {lastMonthPosts} <span className="text-gray-500 ml-1">Last month</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Growth Overview
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="month" stroke={NAHARA_BLUE} />
            <YAxis stroke={NAHARA_BLUE} />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke={NAHARA_BLUE} strokeWidth={3} />
            <Line type="monotone" dataKey="posts" stroke={NAHARA_GREEN} strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6 justify-center">
        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="flex flex-col flex-1 shadow-md p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700"
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-base font-semibold text-gray-800 dark:text-white">Recent Users</h1>
            <NaharaButton href="/dashboard?tab=users" label="See all" />
          </div>
          <NaharaTable
            headers={['Image', 'Username']}
            rows={users}
            renderRow={(user: User) => {
              const initials = getUserInitials(user.username);
              return (
                <tr
                  key={user._id}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-[#0A2640]/5"
                >
                  <td className="px-4 py-2">
                    {user.profilePicture ? (
                      <Image
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#1B9C85]"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-600 text-white flex items-center justify-center text-sm font-bold">
                        {initials}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 font-medium">{user.username}</td>
                </tr>
              );
            }}
          />
        </motion.div>

        {/* Recent Posts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col flex-1 shadow-md p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700"
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-base font-semibold text-gray-800 dark:text-white">Recent Posts</h1>
            <NaharaButton href="/dashboard?tab=posts" label="See all" />
          </div>
          <NaharaTable
            headers={['Image', 'Title', 'Category']}
            rows={posts}
            renderRow={(post: Post) => (
              <tr
                key={post._id}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-[#1B9C85]/5"
              >
                <td className="px-4 py-2">
                  <Image
                    src={post.image || DEFAULT_POST_IMAGE}
                    alt={post.title}
                    className="w-14 h-10 rounded-lg object-cover"
                    width={56}
                    height={40}
                  />
                </td>
                <td className="px-4 py-2 font-medium">{post.title}</td>
                <td className="px-4 py-2 text-gray-500">{post.category}</td>
              </tr>
            )}
          />
        </motion.div>
      </div>
    </div>
  );
}
