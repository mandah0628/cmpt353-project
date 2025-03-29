import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage';
import ChannelListPage from '../pages/ChannelListPage';
import ChannelPage from '../pages/ChannelPage';
import PostPage from '../pages/PostPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import GuestRoute from './GuestRoute';

export default function Router() {
    return(
        <Routes>

            {/* public routes, accessible by anyone */}
            <Route path='/' element={<HomePage />} />
            <Route path='/channels' element={<ChannelListPage />} />
            <Route path='/channels/:channelName' element={<ChannelPage />} />
            <Route path='/channels/:channelName/:postId' element={<PostPage />} />

            {/* guest only routes, meaning these routes cannot be accessed by the user if they are logged in */}
            <Route 
                path='/login' 
                element={
                    <GuestRoute>
                        <LoginPage/>
                    </GuestRoute>
                } 
            />
            <Route 
                path='/register' 
                element={
                    <GuestRoute>
                        <RegisterPage/>
                    </GuestRoute>
                } 
            />
        </Routes>
    );
}