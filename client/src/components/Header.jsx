import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function Header({ onCreateChannelClick, onCreatePostClick }) {
  const location = useLocation();
  const navigate = useNavigate()

  const {authState, logout} = useAuth();

  const pathname = location.pathname;

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isChannelPage = pathname === "/channels";

  const isPostPage = /^\/channels\/[^\/]+$/.test(pathname) || /^\/channels\/[^\/]+\/post\/[^\/]+$/.test(pathname);



  if (isAuthPage) {
    return null;
  }
  


  return (
    <header className="flex items-center w-full bg-blue-400 p-5 shadow-xl fixed">

      {/* Left side: Buttons */}
      <div className="w-1/3 text-2xl flex gap-8 font-bold">

        {/* Login/Logout */}
        <button 
          onClick={() => (authState ? logout() : navigate("/login"))}
          className='hover:text-white  hover:transition-colors duration-100 cursor-pointer'
        >
          {authState ? "Logout" : "Log In"}
        </button>

        {/* Create channel */}
        {isChannelPage && (
          <button 
            onClick={onCreateChannelClick}
            className='hover:text-white  hover:transition-colors duration-100 rounded-xl cursor-pointer'
          >
            Create Channel
          </button>
        )}

        {/* Create post */}
        {isPostPage && (
          <button 
            onClick={onCreatePostClick}
            className='hover:text-white  hover:transition-colors duration-100 rounded-xl cursor-pointer'
          >
            Create Post
          </button>
        )}
      </div>

      {/* Center: Title grows to fill leftover space, centered text */}
      <button
        className="w-1/3 text-center text-2xl font-bold hover:text-white transition-colors duration-100 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Posting App
      </button>

      {/* Right side: Empty spacer to keep the title centered */}
      <div className="w-1/3 flex justify-end bg-amber-800" />
    </header>
  );
}
  