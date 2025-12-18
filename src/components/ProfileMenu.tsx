'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
  Camera,
  Edit3,
  Lock,
  Bell,
  Trash2,
  Save,
  LogOut,
  X,
  MessageSquare,
} from 'lucide-react';
import axios from 'axios';

const defaultImage = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

interface DecodedToken {
  userName: string;
  role: 'ADMIN' | 'USER';
  profileImage?: string;
}

interface ProfileMenuProps {
  user: DecodedToken;
  profileImage: string | null;
  onUpdateProfileImage: (newImage: string) => void;
  onUpdateBio: (updates: { username?: string; bio?: string }) => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  user,
  profileImage,
  onUpdateProfileImage,
  onUpdateBio,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(profileImage);
  const [editData, setEditData] = useState({ username: user.userName, bio: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const isAdmin = user.role === 'ADMIN';

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload: any = {};
      if (editData.username && editData.username !== user.userName) payload.username = editData.username;
      if (editData.bio) payload.bio = editData.bio;
      if (previewImage && previewImage !== profileImage) payload.profileImage = previewImage;

      if (Object.keys(payload).length === 0) {
        setMessage('⚠️ No changes made.');
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) throw new Error('Unauthorized');

      const res = await axios.put('/api/update-profile', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data as { success: boolean };

      if (data.success) {
        onUpdateProfileImage(payload.profileImage || profileImage);
        onUpdateBio({ username: payload.username, bio: payload.bio });
        setMessage(' Profile updated successfully!');
        setPreviewImage(null);
        setIsEditing(false);
      } else {
        setMessage(' Update failed.');
      }
    } catch (err) {
      console.error(err);
      setMessage(' Update failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="flex justify-center items-center w-full p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 md:p-10 relative"
      >
        {/* Profile Image & Info */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <Image
              src={previewImage || profileImage || defaultImage}
              alt="Profile"
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
            />
            {isEditing && (
              <label className="absolute bottom-2 right-2 bg-red-600 p-2 rounded-full cursor-pointer hover:bg-red-700 transition">
                <Camera size={16} color="white" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          <div className="flex flex-col gap-2 text-center md:text-left w-full">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editData.username}
                  onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:text-white"
                />
                <textarea
                  rows={3}
                  value={editData.bio}
                  onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:text-white"
                />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{user.userName}</h2>
              </>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center md:justify-end gap-3 mt-6">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 flex items-center gap-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition"
              >
                <Edit3 size={16} /> Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 flex items-center gap-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-4 py-2 flex items-center gap-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : <><Save size={16} /> Save</>}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 flex items-center gap-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                <X size={16} /> Cancel
              </button>
            </div>
          )}
        </div>

        {message && (
          <p className="text-center text-sm mt-3 text-gray-600 dark:text-gray-300">{message}</p>
        )}
      </motion.div>
    </div>
  );
};

export default ProfileMenu;
