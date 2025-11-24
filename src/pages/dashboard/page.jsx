import React, { useState } from 'react';
import DashboardLayout from './components/DashboardLayout';
import Snaps from './views/Snaps';
import Templates from './views/Templates';
import Leaderboard from './views/Leaderboard';
import Settings from './views/Settings';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('snaps');

  const renderView = () => {
    switch (activeView) {
      case 'snaps': return <Snaps />;
      case 'templates': return <Templates />;
      case 'leaderboard': return <Leaderboard />;
      case 'settings': return <Settings />;
      default: return <Snaps />;
    }
  };

  return (
    <DashboardLayout activeView={activeView} setActiveView={setActiveView}>
      {renderView()}
    </DashboardLayout>
  );
};

export default Dashboard;