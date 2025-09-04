
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAdminAuth from '../../hooks/useAdminAuth';
import {
    HomeIcon,
    BuildingOfficeIcon,
    WrenchScrewdriverIcon,
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

const adminNavLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: HomeIcon },
    { name: 'Manage Projects', path: '/admin/projects', icon: BuildingOfficeIcon },
    { name: 'Manage Services', path: '/admin/services', icon: WrenchScrewdriverIcon },
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { logout } = useAdminAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-700">
                <h1 className="text-2xl font-bold text-white">PASALKA</h1>
                <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
            <nav className="flex-grow p-4 space-y-2">
                {adminNavLinks.map(link => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive ? 'bg-indigo-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`
                        }
                    >
                        <link.icon className="h-5 w-5 mr-3" />
                        {link.name}
                    </NavLink>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-700">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                    <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
                    Logout
                </button>
            </div>
        </div>
    );
    
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Mobile sidebar */}
            <div className={`fixed inset-0 flex z-40 lg:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
                 <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setSidebarOpen(false)}></div>
                <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-gray-800 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={() => setSidebarOpen(false)}>
                            <XMarkIcon className="h-6 w-6 text-white"/>
                        </button>
                    </div>
                    <SidebarContent />
                </div>
            </div>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex flex-col w-64">
                    <div className="flex flex-col h-0 flex-1 bg-gray-800">
                        <SidebarContent />
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow lg:hidden">
                    <button className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden" onClick={() => setSidebarOpen(true)}>
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                </div>
                <main className="flex-1 relative overflow-y-auto focus:outline-none p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
