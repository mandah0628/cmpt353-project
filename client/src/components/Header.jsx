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
    <header className="flex justify-between items-center w-full bg-blue-400 p-5 shadow-xl fixed">


    {/* left buttons */}
    <div className="flex gap-8 text-2xl font-bold">
      <button 
        onClick={() => (authState ? logout() : navigate("/login"))}
        className="hover:text-white transition-colors duration-100 cursor-pointer"
      >
        {authState ? "Logout" : "Log In"}
      </button>

      {isChannelPage && (
        <button 
          onClick={onCreateChannelClick}
          className="hover:text-white transition-colors duration-100 rounded-xl cursor-pointer"
        >
          Create Channel
        </button>
      )}

      {isPostPage && (
        <button 
          onClick={onCreatePostClick}
          className="hover:text-white transition-colors duration-100 rounded-xl cursor-pointer"
        >
          Create Post
        </button>
      )}
    </div>


    {/* title  */}
    <button
      className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold hover:text-white transition-colors duration-100 cursor-pointer px-4 py-1 rounded"
      onClick={() => navigate("/")}
    >
      Posting App
    </button>


    {/* account settings button */}
    {authState && (
      <button
        className="text-2xl font-bold hover:text-white transition-colors duration-100 cursor-pointer"
        onClick={() => navigate("/profile-settings")}
      >
        Account Settings
      </button>
    )}
    </header>


  );
}
  