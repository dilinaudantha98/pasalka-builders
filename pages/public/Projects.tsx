
import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectCategory } from '../../types';
import GlassmorphicCard from '../../components/GlassmorphicCard';

const categoryImages: Record<ProjectCategory, string> = {
    [ProjectCategory.RESIDENTIAL]: 'https://picsum.photos/seed/cat-res/800/600',
    [ProjectCategory.HOSPITALITY]: 'https://picsum.photos/seed/cat-hos/800/600',
    [ProjectCategory.RETAIL]: 'https://picsum.photos/seed/cat-ret/800/600',
    [ProjectCategory.COMMERCIAL]: 'https://picsum.photos/seed/cat-com/800/600',
    [ProjectCategory.EDUCATIONAL]: 'https://picsum.photos/seed/cat-edu/800/600',
    [ProjectCategory.INDUSTRIAL]: 'https://picsum.photos/seed/cat-ind/800/600',
};

const Projects: React.FC = () => {
    const categories = Object.values(ProjectCategory);

    return (
        <div className="space-y-16">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Our Portfolio</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
                    Explore a curated collection of our projects, showcasing our versatility and dedication to quality across various sectors.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category) => {
                    const categorySlug = category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                    return (
                        <Link to={`/projects/${categorySlug}`} key={category}>
                            <div className="relative rounded-2xl overflow-hidden group h-64 shadow-lg">
                                <img src={categoryImages[category]} alt={category} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors duration-300 flex items-center justify-center">
                                    <h2 className="text-2xl font-bold text-white tracking-wider">{category}</h2>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
};

export default Projects;
