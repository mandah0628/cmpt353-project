import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function GuestRoute({children}) {
    const { authState } = useAuth();
    return authState ? <Navigate to="/" /> : children;
}