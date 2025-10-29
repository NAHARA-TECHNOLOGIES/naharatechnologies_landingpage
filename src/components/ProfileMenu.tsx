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
import { jwtDecode } from 'jwt-decode';

const defaultImage = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

interface UserProfile {
  username: string;
  email: string;
  bio?: string;
  image?: string;
  role?: 'ADMIN' | 'USER';
}

interface DecodedToken {
  userName: string;
  role: 'ADMIN' | 'USER';
  profileImage?: string;
}

const ProfileMenu: React.FC = () => {
  const [user, setUser] = useState<UserProfile>({
    username: '',
    email: '',
    bio: '',
    image: '',
    role: 'USER',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editData, setEditData] = useState({ username: '', bio: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUser({
          username: decoded.userName,
          email: decoded.userName + '@nahara.com',
          role: decoded.role,
          bio: 'Building the future with Nahara Tech 🌍',
          image: decoded.profileImage || defaultImage,
        });
      } catch (err) {
        console.error('Invalid token', err);
      }
    } else {
      setUser({
        username: 'Guest User',
        email: 'guest@nahara.com',
        bio: 'Logged in as a guest.',
        role: 'USER',
      });
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setUser({
        ...user,
        username: editData.username || user.username,
        bio: editData.bio || user.bio,
        image: previewImage || user.image,
      });
      setIsEditing(false);
      setMessage('✅ Profile updated successfully!');
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const isAdmin = user.role === 'ADMIN';

  return (
    <div className="flex justify-center items-center w-full p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 md:p-10 relative"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <Image
              src={previewImage || user.image || defaultImage}
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
                  onChange={(e) =>
                    setEditData({ ...editData, username: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:text-white"
                />
                <textarea
                  rows={3}
                  value={editData.bio}
                  onChange={(e) =>
                    setEditData({ ...editData, bio: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:text-white"
                />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {user.username}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  {user.bio}
                </p>
              </>
            )}
          </div>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
          <FeatureCard icon={<Trash2 size={18} />} label="Delete Account" onClick={() => setShowDeleteModal(true)} />
          <FeatureCard icon={<MessageSquare size={18} />} label="Drop Feedback" onClick={() => setShowFeedbackModal(true)} />
          <FeatureCard icon={<LogOut size={18} />} label="Logout" onClick={handleLogout} />

          {isAdmin && (
            <>
              <FeatureCard icon={<Lock size={18} />} label="Change Password" onClick={() => alert('Change password')} />
              <FeatureCard icon={<Bell size={18} />} label="Notifications" onClick={() => alert('Open notifications')} />
            </>
          )}
        </div>

        {/* Modals */}
        <AnimatePresence>
          {showDeleteModal && (
            <DraggableModal title="Delete Account" onClose={() => setShowDeleteModal(false)}>
              <DeleteConfirm onDelete={() => alert('Account deleted!')} />
            </DraggableModal>
          )}
          {showFeedbackModal && (
            <DraggableModal title="Drop Feedback" onClose={() => setShowFeedbackModal(false)}>
              <FeedbackForm />
            </DraggableModal>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const FeatureCard = ({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void; }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    onClick={onClick}
    className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
  >
    <div className="text-red-600">{icon}</div>
    <span className="text-gray-800 dark:text-gray-200">{label}</span>
  </motion.div>
);

const DraggableModal = ({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void; }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useTransform(y, [-100, 100], [0.98, 1.02]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        drag
        dragMomentum={false}
        style={{ x, y, scale }}
        dragElastic={0.15}
        className="bg-white dark:bg-gray-900 rounded-xl p-6 w-96 shadow-2xl relative cursor-grab active:cursor-grabbing"
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{title}</h3>
        <div>{children}</div>
      </motion.div>
    </motion.div>
  );
};

const DeleteConfirm = ({ onDelete }: { onDelete: () => void }) => (
  <div className="text-center">
    <p className="mb-4 text-gray-600 dark:text-gray-300">
      Are you sure you want to delete your account? This action cannot be undone.
    </p>
    <button
      onClick={onDelete}
      className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md transition"
    >
      Confirm Delete
    </button>
  </div>
);

const FeedbackForm = () => (
  <div className="flex flex-col gap-3">
    <textarea
      rows={4}
      placeholder="Write your feedback..."
      className="p-2 rounded-md border dark:bg-gray-800"
    />
    <button className="bg-red-700 hover:bg-red-800 text-white py-2 rounded-md transition">
      Submit Feedback
    </button>
  </div>
);

export default ProfileMenu;
