import React, { useState } from 'react';
import DashboardLayout from './components/DashboardLayout';
import Projects from './views/Projects';
import Templates from './views/Templates';
import Leaderboard from './views/Leaderboard';
import Settings from './views/Settings';
import Tutorials from './views/Tutorials';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('projects');

  const renderView = () => {
    switch (activeView) {
      case 'projects': return <Projects />;
      case 'home': return <Projects />; // Reusing Projects for Home for now until Home view is built
      case 'templates': return <Templates />;
      case 'leaderboard': return <Leaderboard />;
      case 'tutorials': return <Tutorials />;
      case 'settings': return <Settings />;
      default: return <Projects />;
    }
  };

  return (
    <DashboardLayout activeView={activeView} setActiveView={setActiveView}>
      {renderView()}
    </DashboardLayout>
  );
};

export default Dashboard;