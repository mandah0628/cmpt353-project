import { useState } from 'react';
import Router from './routes/routes';
import Header from './components/Header';
import CreateChannelModal from './components/CreateChannelModal';
import CreatePostModal from './components/CreatePostModal';

export default function App() {
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  return (
    <>
      <Header 
        onCreateChannelClick={() => setShowCreateChannelModal(true)} 
        onCreatePostClick={() => setShowCreatePostModal(true)} 
      />
      <Router />

      {showCreateChannelModal && (
        <CreateChannelModal onClose={() => setShowCreateChannelModal(false)} />
      )}

      {showCreatePostModal && (
        <CreatePostModal onClose={() => setShowCreatePostModal(false)} />
      )}
    </>
  );
}
