
import React, { useState, useEffect } from 'react';
import type { Service } from '../../types';
import GlassmorphicCard from '../../components/GlassmorphicCard';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import * as HIcons from '@heroicons/react/24/solid';

const DynamicHeroIcon = ({ icon, className }: { icon: string; className?: string }) => {
  const IconComponent = (HIcons as any)[icon];

  if (!IconComponent) {
    // Return a default icon or null
    return null;
  }

  return <IconComponent className={className} />;
};

// ServiceDetailModal defined outside the main component
const ServiceDetailModal: React.FC<{ service: Service; onClose: () => void }> = ({ service, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="relative bg-gray-800/80 border border-cyan-500/50 rounded-2xl max-w-2xl w-full p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <XMarkIcon className="h-6 w-6" />
                </button>
                <div className="flex items-start space-x-4">
                    <div className="bg-cyan-500/10 p-3 rounded-full">
                         <DynamicHeroIcon icon={service.icon} className="h-8 w-8 text-cyan-400" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-2">{service.title}</h2>
                        <p className="text-gray-300 mb-6">{service.description}</p>
                    </div>
                </div>

                <h3 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">What's Included:</h3>
                <ul className="space-y-3">
                    {service.details.map((detail, index) => (
                        <li key={index} className="flex items-center">
                            <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                            <span className="text-gray-200">{detail}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const Services: React.FC = () => {
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('/api/services');
                if (!response.ok) {
                    throw new Error('Failed to fetch services');
                }
                const data = await response.json();
                setServices(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) {
        return <div className="text-center p-8">Loading services...</div>;
    }

    if (error) {
        return <div className="text-center p-8 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="space-y-16">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Our Expertise</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
                    From concept to completion, we offer a comprehensive suite of services to ensure every detail is perfected.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service) => (
                    <GlassmorphicCard
                        key={service.id}
                        className="flex flex-col text-center items-center cursor-pointer hover:-translate-y-2"
                        onClick={() => setSelectedService(service)}
                    >
                        <div className="bg-cyan-500/10 p-4 rounded-full mb-4">
                            <DynamicHeroIcon icon={service.icon} className="h-10 w-10 text-cyan-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                        <p className="text-gray-300 flex-grow">{service.description}</p>
                    </GlassmorphicCard>
                ))}
            </div>
            
            {selectedService && <ServiceDetailModal service={selectedService} onClose={() => setSelectedService(null)} />}
        </div>
    );
};

export default Services;
