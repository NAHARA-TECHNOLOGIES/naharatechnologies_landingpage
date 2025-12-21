'use client';

import React, { useEffect, useState } from 'react';
import DashSider from '@/components/DashSider';
import ProfileMenu from '@/components/ProfileMenu';
import DashPosts from '@/components/DashPosts';
import DashUsers from '@/components/DashUsers';
import DashboardComp from '@/components/DashboardComp';
import CreatePost from '@/components/CreatePost';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, Menu, Plus } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface DecodedToken {
  userName: string;
  role: 'ADMIN' | 'USER';
  profileImage?: string;
  firstName?: string;
  lastName?: string;
}

interface User {
  userName: string;
  profileImage?: string;
  firstName?: string;
  lastName?: string;
}

interface UserResponse {
  user: User;
}

const Dashboard: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [tab, setTab] = useState<string>('dash');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [decodedUser, setDecodedUser] = useState<DecodedToken | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);


const handleUpdateProfileImage = (newImage: string) => {
  setProfileImage(newImage);
  if (decodedUser) setDecodedUser({ ...decodedUser, profileImage: newImage });
};

const handleUpdateBio = (updates: { username?: string; bio?: string }) => {
  if (decodedUser) setDecodedUser({ ...decodedUser, ...updates });
};


useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/?login=true');
    return;
  }
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    setDecodedUser(decoded);
  } catch (err) {
    localStorage.removeItem('token');
    router.push('/?login=true');
  }
}, [router]);

useEffect(() => {
  if (typeof window !== 'undefined' && window.innerWidth >= 768) {
    setSidebarOpen(true);
  }
}, []);


  useEffect(() => {
    const urlTab = searchParams?.get('tab');
    if (urlTab) {
      setTab(urlTab);
      localStorage.setItem('activeTab', urlTab);
    } else {
      const savedTab = localStorage.getItem('activeTab');
      if (savedTab) setTab(savedTab);
    }
  }, [searchParams]);

  // Prevent non-admin from accessing createpost
  useEffect(() => {
    if (decodedUser && decodedUser.role !== 'ADMIN' && tab === 'createpost') {
      setTab('dash');
      router.replace('/dashboard?tab=dash');
    }
  }, [decodedUser, tab, router]);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!decodedUser) return;
      try {
        const res = await axios.get<UserResponse>(
          `/api/user/getUser/${decodedUser.userName}`
        );
        const user = res.data.user;
        setProfileImage(user?.profileImage || null);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };
    fetchProfile();
  }, [decodedUser]);

  const handleTabChange = (newTab: string) => {
    if (decodedUser?.role !== 'ADMIN' && newTab === 'createpost') {
      toast.error('Only admins can create posts');
      return;
    }
    setLoading(true);
    setTab(newTab);
    localStorage.setItem('activeTab', newTab);
    setSidebarOpen(false);
    router.push(`/dashboard?tab=${newTab}`);
    setTimeout(() => setLoading(false), 500);
  };

  if (!decodedUser) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <Loader2 className="animate-spin text-red-600" size={32} />
      </div>
    );
  }

  const isAdmin = decodedUser.role === 'ADMIN';

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-1 items-center justify-center h-full">
          <Loader2 className="animate-spin text-red-700" size={30} />
        </div>
      );
    }

    switch (tab) {
  case 'profile':
  case 'manageprofile':
    return (
      <ProfileMenu
        user={decodedUser}
        profileImage={profileImage}
        onUpdateProfileImage={handleUpdateProfileImage}
        onUpdateBio={handleUpdateBio}
      />
    );
  case 'posts':
    return <DashPosts />;
  case 'users':
    return <DashUsers />;
  case 'createpost':
    return isAdmin ? <CreatePost /> : <DashboardComp />;
  default:
    return <DashboardComp />;
}

  };

  
  


  const initials =
    decodedUser.firstName && decodedUser.lastName
      ? `${decodedUser.firstName[0]}${decodedUser.lastName[0]}`
      : decodedUser.userName?.slice(0, 2).toUpperCase() || 'NN';

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between md:hidden px-4 py-3 bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
       <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
    >
      <Menu size={22} className="text-gray-800 dark:text-gray-200" />
    </button>

        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Dashboard
        </h1>
        {isAdmin && (
          <button
            onClick={() => handleTabChange('createpost')}
            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            <Plus size={20} />
          </button>
        )}
      </header>

      {/* Sidebar */}
      <AnimatePresence>
      {(sidebarOpen || typeof window !== 'undefined') && (
       <motion.aside
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.3 }}
          className={`
            fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50
            md:static md:translate-x-0 md:block
            ${!sidebarOpen ? 'hidden' : 'block'}
          `}
        >


            <DashSider
              handleTabChange={handleTabChange}
              isAdmin={isAdmin}
              activeTab={tab}
              hideOverview={!isAdmin} 
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity"
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-3 sm:p-5 md:p-8 overflow-y-auto flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {profileImage ? (
              <Image
                src={profileImage as string}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                {initials}
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white capitalize">
                {tab === 'dash'
                  ? 'Overview'
                  : tab === 'profile' || tab === 'manageprofile'
                  ? 'Profile Settings'
                  : tab === 'posts'
                  ? 'Manage Posts'
                  : tab === 'users'
                  ? 'User Management'
                  : tab === 'createpost'
                  ? 'Create New Post'
                  : 'Dashboard'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {tab === 'dash'
                  ? `Welcome to your dashboard, ${
                      decodedUser.firstName && decodedUser.lastName
                        ? `${decodedUser.firstName} ${decodedUser.lastName}`
                        : decodedUser.userName
                    }!`
                  : tab === 'createpost'
                  ? 'Start creating your next big post easily.'
                  : 'Manage and customize your workspace.'}
              </p>
            </div>
          </div>

          {isAdmin && (
            <button
              onClick={() => handleTabChange('createpost')}
              className="hidden sm:flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
            >
              <Plus size={18} />
              <span>Create Post</span>
            </button>
          )}
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col gap-8 pb-20 md:pb-10"
        >
          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
