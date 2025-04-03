import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage';
import ChannelListPage from '../pages/ChannelListPage';
import ChannelPage from '../pages/ChannelPage';
import PostPage from '../pages/PostPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import GuestRoute from './GuestRoute';

export default function Router() {
    return (
      <Routes>
        {/* your routes */}
        <Route path='/' element={<HomePage />} />
        <Route path='/channels' element={<ChannelListPage />} />
        <Route path='/channels/:channelId' element={<ChannelPage />} />
        <Route path='/channels/:channelId/post/:postId' element={<PostPage />} />
  
        <Route 
          path='/login' 
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route 
          path='/register' 
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          } 
        />
      </Routes>
    );
  }