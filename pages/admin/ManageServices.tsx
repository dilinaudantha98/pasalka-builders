
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Service } from '../../types';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import * as HIcons from '@heroicons/react/24/solid';

const DynamicHeroIcon = ({ icon, className }: { icon: string; className?: string }) => {
  const IconComponent = (HIcons as any)[icon];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};

const ManageServices: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchServices = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch('/api/admin/services', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error('Failed to fetch services');
            const data = await response.json();
            setServices(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                const token = localStorage.getItem('admin_token');
                const response = await fetch('/api/admin/services', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ id }),
                });
                if (!response.ok) throw new Error('Failed to delete service');
                fetchServices(); // Refresh list
            } catch (err: any) {
                alert(`Error: ${err.message}`);
            }
        }
    };

    if (loading) return <div>Loading services...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Manage Services</h1>
                <Link
                    to="/admin/services/edit/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add New Service
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Title</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {services.map((service) => (
                                <tr key={service.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="bg-indigo-100 p-2 rounded-full mr-4">
                                                <DynamicHeroIcon icon={service.icon} className="h-5 w-5 text-indigo-600" />
                                            </div>
                                            <div className="text-sm font-medium text-gray-900">{service.title}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 max-w-sm">
                                        <p className="text-sm text-gray-500 truncate">{service.description}</p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link to={`/admin/services/edit/${service.id}`} className="text-indigo-600 hover:text-indigo-900 inline-flex items-center mr-4">
                                            <PencilIcon className="h-4 w-4 mr-1"/> Edit
                                        </Link>
                                        <button onClick={() => handleDelete(service.id)} className="text-red-600 hover:text-red-900 inline-flex items-center">
                                            <TrashIcon className="h-4 w-4 mr-1"/> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageServices;
