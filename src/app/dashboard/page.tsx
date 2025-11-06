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


interface DecodedToken {
  userName: string;
  role: 'ADMIN' | 'USER';
  profileImage?: string;
}

const Dashboard: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tab, setTab] = useState<string>('dash');
  const [loading, setLoading] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [decodedUser, setDecodedUser] = useState<DecodedToken | null>(null);

 useEffect(() => {
  const token = localStorage.getItem('token');

  if (!token) {
    const currentPath = encodeURIComponent(window.location.pathname + window.location.search);
    router.push(`/?login=true&redirectTo=${currentPath}`);
    return;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    setDecodedUser(decoded);
  } catch (error) {
    console.error('Invalid JWT:', error);
    localStorage.removeItem('token');
    router.push(`/?login=true`);
  }
}, [router]);

useEffect(() => {
  const loginParam = searchParams?.get('login');
  if (loginParam === 'true') {
    toast.error('Please sign in  or register  to continue', { duration: 4000 });
    router.replace('/', { scroll: false });
  }
}, [searchParams, router]);



  useEffect(() => {
    const tabFromUrl = searchParams?.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
      localStorage.setItem('activeTab', tabFromUrl);
    } else {
      const savedTab = localStorage.getItem('activeTab');
      if (savedTab) setTab(savedTab);
    }
  }, [searchParams]);

  const handleTabChange = (newTab: string) => {
    setLoading(true);
    setTab(newTab);
    router.push(`/dashboard?tab=${newTab}`);
    localStorage.setItem('activeTab', newTab);
    setSidebarOpen(false);
    setTimeout(() => setLoading(false), 500);
  };

  const isAdmin = decodedUser?.role === 'ADMIN';
  useEffect(() => {
    if (decodedUser && tab === 'createpost' && !isAdmin) {
      router.replace('/dashboard?tab=dash');
    }
  }, [tab, isAdmin, router, decodedUser]);

  if (!decodedUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-red-600" size={32} />
      </div>
    );
  }

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
        return <ProfileMenu />;
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

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
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

      <aside
        className={`fixed md:static inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out z-50 md:z-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <DashSider />
      </aside>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity"
        ></div>
      )}

      <main className="flex-1 p-3 sm:p-5 md:p-8 overflow-y-auto flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
                ? 'Welcome to your admin dashboard.'
                : tab === 'createpost'
                ? 'Start creating your next big post easily.'
                : 'Manage and customize your workspace.'}
            </p>
          </div>

          {/* ✅ Only show create post button for Admins */}
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

        <div className="flex-1 flex flex-col gap-8 pb-20 md:pb-10 transition-opacity duration-500 ease-in-out">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
