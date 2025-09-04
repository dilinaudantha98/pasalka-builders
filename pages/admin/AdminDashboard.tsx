
import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA, SERVICES_DATA } from '../../constants';
import { BuildingOfficeIcon, WrenchScrewdriverIcon, ArrowUpRightIcon } from '@heroicons/react/24/solid';

const StatCard: React.FC<{ title: string; value: number; icon: React.ElementType; link: string; }> = ({ title, value, icon: Icon, link }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
            </div>
            <div className="bg-indigo-500 text-white p-3 rounded-full">
                <Icon className="h-6 w-6" />
            </div>
        </div>
        <div className="mt-4">
            <Link to={link} className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center">
                Manage <ArrowUpRightIcon className="h-4 w-4 ml-1" />
            </Link>
        </div>
    </div>
);


const AdminDashboard: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Projects" value={PROJECTS_DATA.length} icon={BuildingOfficeIcon} link="/admin/projects" />
                <StatCard title="Total Services" value={SERVICES_DATA.length} icon={WrenchScrewdriverIcon} link="/admin/services" />
                
                <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2 lg:col-span-1">
                    <h3 className="font-bold text-lg">Welcome, Admin!</h3>
                    <p className="text-gray-600 mt-2">
                        From this dashboard, you can manage all the content for the Pasalka Builders & Decorators website.
                        Use the navigation on the left to get started.
                    </p>
                </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                <p className="text-gray-600">Activity logging is not implemented in this demo.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
