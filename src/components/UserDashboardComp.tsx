'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface DecodedToken {
  userName: string;
  role: 'ADMIN' | 'USER';
  profileImage?: string;
}

interface UserDashboardProps {
  tab: string;
  decodedUser: DecodedToken;
  onTabChange: (newTab: string) => void;
}

interface UserData {
  username: string;
  email: string;
  bio?: string;
  profileImage?: string | null;
  initials?: string | null;
  createdAt?: string;
}

interface ApiResponse<T> {
  success?: boolean;
  user?: T;
  message?: string;
}

const DEFAULT_AVATAR = '/placeholder.png';

const UserDashboardComp: React.FC<UserDashboardProps> = ({ tab, decodedUser, onTabChange }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  /** Fetch user */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/login');

    const fetchUser = async () => {
      try {
        const encodedUsername = encodeURIComponent(decodedUser.userName);
        const res = await axios.get<ApiResponse<UserData>>(`/api/user/getUser/${encodedUsername}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.user) {
          const u = res.data.user;
          const safeProfileImage = u.profileImage || '';
          const initials =
            !safeProfileImage && u.username
              ? `${u.username[0]}${u.username[u.username.length - 1]}`.toUpperCase()
              : null;

          setUser({ ...u, profileImage: safeProfileImage, initials, bio: u.bio || '' });
          setUsername(u.username);
          setBio(u.bio || '');
          setProfileImage(safeProfileImage);
        } else {
          router.push('/login');
        }
      } catch (err) {
        console.error(err);
        router.push('/login');
      }
    };

    fetchUser();
  }, [decodedUser.userName, router]);

  /** Update profile */
  const handleUpdateProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setLoading(true);
    try {
      const res = await axios.put<ApiResponse<UserData>>(
        '/api/user/updateProfile',
        { username, bio, profileImage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.user) {
        const u = res.data.user;
        const initials =
          !u.profileImage && u.username
            ? `${u.username[0]}${u.username[u.username.length - 1]}`.toUpperCase()
            : u.initials || null;
        setUser({ ...u, initials });
        setMessage('Profile updated successfully!');
      }
    } catch (err) {
      setMessage('Error updating profile');
    }
    setLoading(false);
  };

  /** Update bio only */
  const handleUpdateBio = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setLoading(true);
    try {
      const res = await axios.patch<ApiResponse<UserData>>(
        '/api/user/updateBio',
        { bio },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.user) {
        setUser(res.data.user);
        setMessage('Bio updated successfully!');
      }
    } catch (err) {
      setMessage('Failed to update bio');
    }
    setLoading(false);
  };

  /** Delete account */
  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    if (!confirm('Delete your account permanently?')) return;

    setLoading(true);
    try {
      await axios.delete('/api/user/deleteAccount', { headers: { Authorization: `Bearer ${token}` } });
      localStorage.removeItem('token');
      router.push('/register');
    } catch (err) {
      setMessage('Failed to delete account');
    }
    setLoading(false);
  };

  /** Logout */
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-96">
        <span className="animate-spin text-red-600">Loading...</span>
      </div>
    );

  const renderProfileImage = () => {
    if (profileImage) {
      return <Image src={profileImage} alt={username} width={80} height={80} className="w-20 h-20 rounded-full object-cover border-2 border-gray-500" />;
    } else {
      const initials =
        user.initials ||
        (username.length >= 2 ? `${username[0]}${username[username.length - 1]}`.toUpperCase() : username[0]?.toUpperCase() || 'U');

      return (
        <div className="w-20 h-20 rounded-full bg-gray-600 text-white flex items-center justify-center text-xl font-bold">
          {initials}
        </div>
      );
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow mt-10">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Welcome, {user.username || decodedUser.userName}
      </h2>

      {message && (
        <div className="mb-4 p-3 rounded bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-gray-200">{message}</div>
      )}

      <div className="space-y-6">
        {/* Username + Image */}
        <div className="flex items-center gap-4">
          {renderProfileImage()}
          <div className="flex-1">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded p-2 bg-gray-50 dark:bg-gray-700 dark:text-gray-100 block"
            />

            <label className="block text-gray-700 dark:text-gray-300 mt-4 mb-2">Profile Image URL</label>
            <input
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
              className="w-full border rounded p-2 bg-gray-50 dark:bg-gray-700 dark:text-gray-100 block"
            />

            <button
              onClick={handleUpdateProfile}
              disabled={loading}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full border rounded p-2 bg-gray-50 dark:bg-gray-700 dark:text-gray-100 block"
          />
          <button
            onClick={handleUpdateBio}
            disabled={loading}
            className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Update Bio'}
          </button>
        </div>

        {/* Logout + Delete */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <button onClick={handleLogout} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 w-full sm:w-auto">
            Logout
          </button>
          <button onClick={handleDeleteAccount} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-full sm:w-auto">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardComp;
