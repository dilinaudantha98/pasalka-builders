
import React from 'react';
import type { Project } from '../types';
import { Link } from 'react-router-dom';
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden group transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:-translate-y-1">
            <div className="overflow-hidden">
                <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-6">
                <p className="text-xs text-cyan-400 uppercase tracking-widest mb-1">{project.category}</p>
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4 h-10 overflow-hidden">{project.shortDescription}</p>
                <Link
                    to={`/project/${project.id}`}
                    className="inline-flex items-center text-cyan-400 font-semibold text-sm group-hover:text-cyan-300 transition-colors"
                >
                    View Project
                    <ArrowLongRightIcon className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;
