import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import Navbar from '../../../components/layout/Navbar';

const DashboardLayout = ({ children, activeView, setActiveView }) => {
    return (
        <div className="flex h-screen bg-white font-sans overflow-hidden">
            <Navbar btnText="Editor" href="/editor" isDashboard />
            <div className="pt-[72px] flex w-full h-full">
                <DashboardSidebar activeView={activeView} setActiveView={setActiveView} />
                <div className="flex-1 overflow-auto bg-white">
                    <div className="max-w-7xl mx-auto p-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
