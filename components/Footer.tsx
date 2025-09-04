
import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const SocialIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
        {children}
    </a>
);

const Footer: React.FC = () => {
    return (
        <footer className="mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="bg-black/10 backdrop-blur-lg border-t border-white/10 rounded-t-2xl px-6 py-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
                        <div className="md:col-span-1 mb-6 md:mb-0">
                            <h2 className="text-2xl font-bold tracking-wider mb-2">PASALKA</h2>
                            <p className="text-gray-400 text-sm">Building Dreams, Creating Reality.</p>
                        </div>
                        <div className="md:col-span-1">
                            <h3 className="font-semibold mb-4 tracking-wide">Quick Links</h3>
                            <ul className="space-y-2">
                                {NAV_LINKS.map(link => (
                                    <li key={link.path}>
                                        <Link to={link.path} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="md:col-span-1">
                            <h3 className="font-semibold mb-4 tracking-wide">Contact Us</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>Phone: +1 (555) 123-4567</li>
                                <li>Email: contact@pasalka.com</li>
                                <li>Address: 123 Design St, Metropolis</li>
                            </ul>
                        </div>
                        <div className="md:col-span-1">
                            <h3 className="font-semibold mb-4 tracking-wide">Follow Us</h3>
                            <div className="flex justify-center md:justify-start space-x-4">
                                <SocialIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                                </SocialIcon>
                                <SocialIcon>
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266.058 1.644.07 4.85.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z" /></svg>
                                </SocialIcon>
                                <SocialIcon>
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.59-11.018-3.714v-2.155z" /></svg>
                                </SocialIcon>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/10 mt-8 pt-6 text-center text-gray-500 text-sm">
                        <p>&copy; {new Date().getFullYear()} Pasalka Builders & Decorators. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
