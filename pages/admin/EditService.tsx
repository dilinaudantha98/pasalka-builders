import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Service } from '../../types';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import * as HIcons from '@heroicons/react/24/solid';

const iconNames = Object.keys(HIcons).filter(k => k.endsWith('Icon'));

const EditService: React.FC = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const navigate = useNavigate();
    const isNew = serviceId === 'new';

    const [service, setService] = useState<Partial<Service>>({
        title: '',
        icon: 'WrenchScrewdriverIcon',
        description: '',
        details: [],
    });
    const [loading, setLoading] = useState(!isNew);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isNew && serviceId) {
            const fetchService = async () => {
                try {
                    const token = localStorage.getItem('admin_token');
                    const response = await fetch(`/api/admin/services?id=${serviceId}`, {
                         headers: { Authorization: `Bearer ${token}` },
                    });
                    if (!response.ok) throw new Error('Failed to fetch service');
                    const data = await response.json();
                    setService(data);
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchService();
        }
    }, [serviceId, isNew]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setService(prev => ({ ...prev, [name]: value }));
    };
    
    const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setService(prev => ({ ...prev, details: e.target.value.split('\n') }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const method = isNew ? 'POST' : 'PUT';
        const url = '/api/admin/services';

        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(service),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || `Failed to ${isNew ? 'create' : 'update'} service`);
            }
            navigate('/admin/services');
        } catch (err: any) {
            setError(err.message);
        }
    };
    
    if (loading) return <div>Loading service data...</div>;

    return (
        <div>
            <Link to="/admin/services" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4 group">
                <ChevronLeftIcon className="w-5 h-5 mr-1 transform group-hover:-translate-x-1 transition-transform" />
                Back to Services
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {isNew ? 'Add New Service' : 'Edit Service'}
            </h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
                {error && <div className="bg-red-100 text-red-700 p-3 rounded-md">{error}</div>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" name="title" id="title" value={service.title} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="icon" className="block text-sm font-medium text-gray-700">Icon</label>
                        <select name="icon" id="icon" value={service.icon} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                            {iconNames.map(name => <option key={name} value={name}>{name}</option>)}
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Short Description</label>
                    <textarea name="description" id="description" rows={3} value={service.description} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                </div>
                <div>
                    <label htmlFor="details" className="block text-sm font-medium text-gray-700">Details (one per line)</label>
                    <textarea name="details" id="details" rows={5} value={service.details?.join('\n')} onChange={handleDetailsChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                </div>
                 <div className="flex justify-end">
                    <button type="submit" className="px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                        {isNew ? 'Create Service' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditService;
