
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Project } from '../../types';
import GlassmorphicCard from '../../components/GlassmorphicCard';
import ImageSlider from '../../components/ImageSlider';
import { ChevronLeftIcon, BuildingOfficeIcon, UserIcon, MapPinIcon, CurrencyDollarIcon, CalendarDaysIcon } from '@heroicons/react/24/solid';

const DetailItem: React.FC<{ icon: React.ElementType, label: string, value: string }> = ({ icon: Icon, label, value }) => (
    <div className="flex items-center space-x-3">
        <Icon className="h-6 w-6 text-cyan-400" />
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="font-semibold text-white">{value}</p>
        </div>
    </div>
);


const ProjectDetail: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`/api/projects?id=${projectId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch project details');
                }
                const data = await response.json();
                setProject(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (projectId) {
            fetchProject();
        }
    }, [projectId]);

    if (loading) {
        return <div className="text-center p-8">Loading project details...</div>;
    }

    if (error || !project) {
        return (
            <div className="text-center">
                <h1 className="text-3xl font-bold">{error || 'Project Not Found'}</h1>
                <Link to="/projects" className="text-cyan-400 mt-4 inline-block">Back to Projects</Link>
            </div>
        );
    }
    
    const categorySlug = project.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');


    return (
        <div className="space-y-12">
            <div>
                 <Link to={`/projects/${categorySlug}`} className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6 group">
                    <ChevronLeftIcon className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                    Back to {project.category}
                </Link>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{project.title}</h1>
                <p className="mt-2 text-lg text-cyan-400">{project.shortDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <ImageSlider images={project.gallery} />
                </div>
                <div className="lg:col-span-1">
                    <GlassmorphicCard className="h-full">
                        <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-3">Project Details</h2>
                        <div className="space-y-5">
                           <DetailItem icon={BuildingOfficeIcon} label="Category" value={project.category} />
                           <DetailItem icon={UserIcon} label="Client" value={project.client} />
                           <DetailItem icon={MapPinIcon} label="Location" value={project.location} />
                           <DetailItem icon={CurrencyDollarIcon} label="Cost" value={project.cost} />
                           <DetailItem icon={CalendarDaysIcon} label="Timeline" value={project.timeline} />
                        </div>
                    </GlassmorphicCard>
                </div>
            </div>

            <div>
                <GlassmorphicCard>
                    <h2 className="text-2xl font-bold mb-4">About The Project</h2>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{project.description}</p>
                </GlassmorphicCard>
            </div>
        </div>
    );
};

export default ProjectDetail;
