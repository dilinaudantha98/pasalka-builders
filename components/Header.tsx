
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20 bg-black/10 backdrop-blur-lg border-b border-white/10 rounded-b-2xl px-6">
                    <Link to="/" className="text-2xl font-bold tracking-wider">
                        PASALKA
                    </Link>
                    <nav className="hidden md:flex items-center space-x-8">
                        {NAV_LINKS.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors hover:text-cyan-400 ${isActive ? 'text-cyan-400' : 'text-gray-200'}`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden mt-2 mx-4">
                    <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-4">
                        <nav className="flex flex-col space-y-4">
                            {NAV_LINKS.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `text-center text-sm font-medium transition-colors hover:text-cyan-400 p-2 rounded-lg ${isActive ? 'text-cyan-400 bg-white/5' : 'text-gray-200'}`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
