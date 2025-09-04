
import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

import Home from './pages/public/Home';
import Services from './pages/public/Services';
import About from './pages/public/About';
import Projects from './pages/public/Projects';
import ProjectCategoryPage from './pages/public/ProjectCategoryPage';
import ProjectDetail from './pages/public/ProjectDetail';
import Contact from './pages/public/Contact';

import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProjects from './pages/admin/ManageProjects';
import EditProject from './pages/admin/EditProject';
import ManageServices from './pages/admin/ManageServices';

import useAdminAuth from './hooks/useAdminAuth';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-gray-900 text-white min-h-screen relative overflow-x-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-fixed" style={{backgroundImage: "url('https://picsum.photos/seed/background/1920/1080')"}}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm"></div>
        <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
                {children}
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    </div>
);

const App: React.FC = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const { isAuthenticated } = useAdminAuth();

    return (
        <Routes>
            <Route path="/admin/*" element={
                <div className="bg-gray-100 min-h-screen">
                    <Routes>
                        <Route path="login" element={<AdminLogin />} />
                        <Route
                            path="/*"
                            element={
                                isAuthenticated ? (
                                    <AdminLayout>
                                        <Routes>
                                            <Route path="dashboard" element={<AdminDashboard />} />
                                            <Route path="projects" element={<ManageProjects />} />
                                            <Route path="projects/edit/:projectId" element={<EditProject />} />
                                            <Route path="services" element={<ManageServices />} />
                                            <Route path="*" element={<Navigate to="dashboard" />} />
                                        </Routes>
                                    </AdminLayout>
                                ) : (
                                    <Navigate to="/admin/login" />
                                )
                            }
                        />
                    </Routes>
                </div>
            } />
            <Route path="/*" element={
                <PublicLayout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/projects/:category" element={<ProjectCategoryPage />} />
                        <Route path="/project/:projectId" element={<ProjectDetail />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </PublicLayout>
            } />
        </Routes>
    );
};

export default App;
