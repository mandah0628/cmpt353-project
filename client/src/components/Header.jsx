import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CreateChannelModal from './CreateChannelModal';
import CreatePostModal from './CreatePostModal';

export default function Header({ onCreateChannelClick, onCreatePostclick }) {
  const location = useLocation();
  const navigate = useNavigate()

  const {authState, logout} = useAuth();

  const pathname = location.pathname;

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isChannelPage = /^\/channels(\/[^\/]+)?$/.test(pathname); 
  const isPostPage = /^\/channels\/[^\/]+\/post\/[^\/]+$/.test(pathname);


  
  if (isAuthPage) {
    return null;
  }
  
  return (
    <header className="">

      <h1 onClick={() => navigate("/")}>
        Posting App
      </h1>

      {/* button containers */}
      <div>

        {/* Logout and login button */}
        <button onClick={() => authState ? logout() : navigate("/login")}>
          {authState ? "Logout" : "Log In"}
        </button>

        {/* Create channel modal button */}
        {isChannelPage && (
          <button onClick={onCreateChannelClick}>
            Create Channel
          </button>
        )}

        {/* Create post modal button */}
        {isPostPage && (
          <button onClick={on}>
            Create Post
          </button>
        )}
            
      </div>
    </header>
  );
}
  