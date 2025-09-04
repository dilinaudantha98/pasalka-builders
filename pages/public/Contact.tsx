
import React, { useState } from 'react';
import GlassmorphicCard from '../../components/GlassmorphicCard';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/solid';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('Sending...');
        // Mock sending email
        setTimeout(() => {
            setFormStatus(`Thank you, ${formData.name}! Your message has been sent.`);
            setFormData({ name: '', email: '', message: '' });
        }, 1500);
    };

    return (
        <div className="space-y-16">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Get In Touch</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
                    We're here to answer any questions you may have. Reach out to us and we'll respond as soon as we can.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <GlassmorphicCard>
                    <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                    {formStatus ? (
                         <div className="text-center p-8 bg-green-500/20 rounded-lg">
                            <p>{formStatus}</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full bg-white/5 border border-white/20 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                                <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full bg-white/5 border border-white/20 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                                <textarea name="message" id="message" rows={5} required value={formData.message} onChange={handleChange} className="mt-1 block w-full bg-white/5 border border-white/20 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full bg-cyan-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105">
                                    Submit
                                </button>
                            </div>
                        </form>
                    )}
                </GlassmorphicCard>

                <div className="space-y-8">
                    <GlassmorphicCard>
                        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                        <div className="space-y-4 text-gray-200">
                            <div className="flex items-center space-x-4">
                                <PhoneIcon className="h-6 w-6 text-cyan-400" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <EnvelopeIcon className="h-6 w-6 text-cyan-400" />
                                <span>contact@pasalka.com</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <MapPinIcon className="h-6 w-6 text-cyan-400" />
                                <span>123 Design St, Metropolis, USA</span>
                            </div>
                        </div>
                    </GlassmorphicCard>
                    <GlassmorphicCard className="h-64 md:h-auto md:flex-grow">
                         <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.213509932155!2d-73.988242084593!3d40.75730397932693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6434221%3A0x23e3e58721c25842!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1678886523456!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-xl"
                        ></iframe>
                    </GlassmorphicCard>
                </div>
            </div>
        </div>
    );
};

export default Contact;
