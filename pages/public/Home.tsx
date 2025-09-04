
import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../../constants';
import ProjectCard from '../../components/ProjectCard';
import GlassmorphicCard from '../../components/GlassmorphicCard';
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';

const Home: React.FC = () => {
    const highlightedProjects = PROJECTS_DATA.slice(0, 3);

    return (
        <div className="space-y-24 md:space-y-32">
            {/* Hero Section */}
            <section className="text-center pt-16 md:pt-24">
                <div className="bg-black/10 backdrop-blur-md rounded-3xl p-8 md:p-12 inline-block">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                        <span className="block">Precision in Construction.</span>
                        <span className="block text-cyan-400 mt-2">Perfection in Design.</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
                        Pasalka Builders & Decorators merges timeless craftsmanship with modern innovation to bring your vision to life.
                    </p>
                    <div className="mt-10 flex justify-center gap-4">
                        <Link
                            to="/projects"
                            className="bg-cyan-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105"
                        >
                            View Our Work
                        </Link>
                        <Link
                            to="/contact"
                            className="bg-white/10 border border-white/20 text-white font-semibold py-3 px-8 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>

            {/* Highlighted Projects */}
            <section>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
                    <p className="mt-2 text-gray-400">A glimpse into our commitment to excellence.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {highlightedProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
                <div className="text-center mt-12">
                     <Link to="/projects" className="inline-flex items-center text-cyan-400 font-semibold text-lg hover:text-cyan-300 transition-colors group">
                        Explore All Projects
                        <ArrowLongRightIcon className="w-6 h-6 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>
            
            {/* CTA Section */}
            <section>
                <GlassmorphicCard className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold">Have a Project in Mind?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-300">
                        Let's collaborate to build something extraordinary. Our team is ready to discuss your ideas and turn them into reality.
                    </p>
                    <div className="mt-8">
                         <Link
                            to="/contact"
                            className="bg-cyan-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105"
                        >
                            Start a Conversation
                        </Link>
                    </div>
                </GlassmorphicCard>
            </section>
        </div>
    );
};

export default Home;
