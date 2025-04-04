import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// guest route
// meaning a logged in user can't access these routes
export default function GuestRoute({children}) {
    const { authState } = useAuth();
    return authState ? <Navigate to="/" /> : children;
}