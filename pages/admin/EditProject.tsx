
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ProjectCategory, Project } from '../../types';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

const EditProject: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();
    const isNew = projectId === 'new';

    const [project, setProject] = useState<Partial<Project>>({
        title: '',
        category: ProjectCategory.RESIDENTIAL,
        client: '',
        location: '',
        cost: '',
        timeline: '',
        description: '',
        shortDescription: '',
        coverImage: '',
        gallery: [],
    });
    const [loading, setLoading] = useState(!isNew);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isNew && projectId) {
            const fetchProject = async () => {
                try {
                    // Note: The public API does not require a token
                    const response = await fetch(`/api/projects?id=${projectId}`);
                    if (!response.ok) throw new Error('Failed to fetch project');
                    const data = await response.json();
                    setProject(data);
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchProject();
        }
    }, [projectId, isNew]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProject(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const method = isNew ? 'POST' : 'PUT';
        const url = '/api/admin/projects';

        // Basic validation
        if (!project.title || !project.category) {
            setError("Title and Category are required.");
            return;
        }

        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(project),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || `Failed to ${isNew ? 'create' : 'update'} project`);
            }
            navigate('/admin/projects');
        } catch (err: any) {
            setError(err.message);
        }
    };
    
    if (loading) return <div>Loading project data...</div>;

    return (
        <div>
            <Link to="/admin/projects" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4 group">
                <ChevronLeftIcon className="w-5 h-5 mr-1 transform group-hover:-translate-x-1 transition-transform" />
                Back to Projects
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {isNew ? 'Add New Project' : 'Edit Project'}
            </h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
                {error && <div className="bg-red-100 text-red-700 p-3 rounded-md">{error}</div>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" name="title" id="title" value={project.title} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                     <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select name="category" id="category" value={project.category} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                           {Object.values(ProjectCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="client" className="block text-sm font-medium text-gray-700">Client</label>
                        <input type="text" name="client" id="client" value={project.client} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <input type="text" name="location" id="location" value={project.location} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost</label>
                        <input type="text" name="cost" id="cost" value={project.cost} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                     <div>
                        <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">Timeline</label>
                        <input type="text" name="timeline" id="timeline" value={project.timeline} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                </div>
                 <div>
                    <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">Short Description</label>
                    <textarea name="shortDescription" id="shortDescription" rows={2} value={project.shortDescription} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Full Description</label>
                    <textarea name="description" id="description" rows={5} value={project.description} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Images</label>
                    <div className="mt-1 p-4 border-2 border-gray-300 border-dashed rounded-md text-center">
                        <p className="text-sm text-gray-600">Image uploads via a file service (e.g., Cloudinary, AWS S3) would be implemented here.</p>
                        <input type="text" name="coverImage" placeholder="Cover Image URL" value={project.coverImage} onChange={handleChange} className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                    </div>
                </div>
                 <div className="flex justify-end">
                    <button type="submit" className="px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                        {isNew ? 'Create Project' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProject;
