
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Project, ProjectCategory } from '../../types';
import ProjectCard from '../../components/ProjectCard';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

const ProjectCategoryPage: React.FC = () => {
    const { category: categorySlug } = useParams<{ category: string }>();
    const [projects, setProjects] = useState<Project[]>([]);
    const [category, setCategory] = useState<ProjectCategory | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const foundCategory = Object.values(ProjectCategory).find(
            c => c.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === categorySlug
        );

        if (foundCategory) {
            setCategory(foundCategory);
            const fetchProjects = async () => {
                try {
                    const response = await fetch(`/api/projects?category=${encodeURIComponent(foundCategory)}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch projects');
                    }
                    const data = await response.json();
                    setProjects(data);
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchProjects();
        } else {
            setLoading(false);
            setError('Category not found');
        }
    }, [categorySlug]);

    if (loading) {
        return <div className="text-center p-8">Loading projects...</div>;
    }

    if (error || !category) {
        return (
            <div className="text-center">
                <h1 className="text-3xl font-bold">{error || 'Category Not Found'}</h1>
                <Link to="/projects" className="text-cyan-400 mt-4 inline-block">Back to All Projects</Link>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <div>
                 <Link to="/projects" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6 group">
                    <ChevronLeftIcon className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                    Back to Project Categories
                </Link>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{category} Projects</h1>
                <p className="mt-4 max-w-2xl text-lg text-gray-300">
                    A showcase of our work within the {category.toLowerCase()} sector.
                </p>
            </div>
            
            {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-400 py-16">No projects found in this category yet. Please check back later.</p>
            )}
        </div>
    );
};

export default ProjectCategoryPage;
