import { useLocation, useParams } from 'react-router-dom';

export default function Header({ onCreateChannelClick }) {
    const location = useLocation();
    const params = useParams();
  
    const forChannelListPage = location.pathname.startsWith("/channels") && !params.channelName;
    const forChannelPage = !!params.channelName && !params.postId;
    const forPostPage = !!params.channelName && !!params.postId;
  
    return (
      <header className="w-full flex justify-end items-center p-4 bg-gray-100 shadow">
        {forChannelListPage && (
          <button
            onClick={onCreateChannelClick}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mr-2"
          >
            Create Channel
          </button>
        )}
        {(forChannelPage || forPostPage) && (
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Create Post
          </button>
        )}
      </header>
    );
  }
  