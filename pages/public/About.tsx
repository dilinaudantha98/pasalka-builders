
import React from 'react';
import { TEAM_DATA, MILESTONES_DATA } from '../../constants';
import GlassmorphicCard from '../../components/GlassmorphicCard';

const TeamMemberCard: React.FC<{ member: typeof TEAM_DATA[0] }> = ({ member }) => (
    <div className="text-center">
        <div className="relative inline-block">
            <img src={member.photoUrl} alt={member.name} className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-2 border-cyan-400/50" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent hover:border-cyan-400 transition-all duration-300"></div>
        </div>
        <h3 className="text-xl font-bold">{member.name}</h3>
        <p className="text-cyan-400">{member.role}</p>
    </div>
);

const About: React.FC = () => {
    return (
        <div className="space-y-24">
            {/* Intro Section */}
            <section className="text-center">
                 <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">About Pasalka Builders</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-300">
                    We are a collective of architects, designers, and builders united by a passion for creating exceptional spaces. For over two decades, we've been transforming ambitious visions into tangible realities.
                </p>
            </section>

            {/* Mission & Vision */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <GlassmorphicCard>
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-gray-300">To deliver unparalleled quality and innovative design solutions, fostering lasting relationships with our clients through transparency, integrity, and a relentless pursuit of excellence.</p>
                </GlassmorphicCard>
                <GlassmorphicCard>
                    <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                    <p className="text-gray-300">To be a globally recognized leader in construction and design, known for our sustainable practices, iconic projects, and unwavering commitment to pushing the boundaries of what's possible.</p>
                </GlassmorphicCard>
            </section>

            {/* Team Section */}
            <section>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Meet Our Leadership</h2>
                    <p className="mt-2 text-gray-400">The driving force behind our success.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {TEAM_DATA.map(member => (
                        <TeamMemberCard key={member.id} member={member} />
                    ))}
                </div>
            </section>

            {/* Timeline Section */}
            <section>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Our Journey</h2>
                    <p className="mt-2 text-gray-400">Key milestones in our history of growth and innovation.</p>
                </div>
                <div className="relative">
                    <div className="absolute left-1/2 w-0.5 h-full bg-cyan-400/30 transform -translate-x-1/2"></div>
                    {MILESTONES_DATA.map((milestone, index) => (
                        <div key={index} className={`flex items-center w-full mb-8 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                            <div className="w-1/2"></div>
                            <div className="w-1/2 px-4">
                                <GlassmorphicCard className={`relative ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                                    <div className={`absolute top-1/2 w-4 h-4 bg-cyan-400 rounded-full transform -translate-y-1/2 ${index % 2 === 0 ? '-left-2 -translate-x-1/2' : '-right-2 translate-x-1/2'}`}></div>
                                    <p className="text-2xl font-bold text-cyan-400">{milestone.year}</p>
                                    <p className="mt-2 text-gray-200">{milestone.description}</p>
                                </GlassmorphicCard>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
