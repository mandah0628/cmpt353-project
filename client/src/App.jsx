import { useLocation } from 'react-router-dom';
import Router from './routes/routes';
import Header from './components/Header';
import CreateChannelModal from './components/CreateChannelModal'; 
import { useState } from 'react';

export default function App() {
  const location = useLocation();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const hideHeader = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideHeader && <Header onCreateChannelClick={() => setShowCreateModal(true)} />}
      <Router />
      {showCreateModal && (
        <CreateChannelModal onClose={() => setShowCreateModal(false)} />
      )}
    </>
  );
}
