import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import CreatePostModal from '../components/CreatePostModal';
import axiosInstance from '../utils/axios';
import Header from '../components/Header';


export default function ChannelPage() {
    const [channel, setChannel] = useState({});
    const [posts, setPosts] = useState([])
    const [fetching, setFetching] = useState(true);

    const [showPostModal, setShowPostModal] = useState(false);

    const navigate = useNavigate();
    const { channelId } = useParams();



    const fetchChannelData = async () => {
        try {
            setFetching(true)
            const channelData = await axiosInstance.get(`/channel/get-channel/${channelId}`);

            setChannel(channelData.data.channel);
            setPosts(channelData.data.posts);
        } catch (error) {
            console.error("Error fetching channel and posts", error.response?.data?.message);
        } finally {
            setFetching(false);
        }
    }



    useEffect(() => {
      fetchChannelData();
    }, [])
    



    if (fetching) {
        return(
            <div className='min-h-screen flex items-center justify-center'>
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }


    return (
        <>
          <Header 
            onCreatePostClick={() => setShowPostModal(true)} 
          />
      
          {/* create post pop-up */}
          {showPostModal && (
            <CreatePostModal onClose={() => setShowPostModal(false)} />
          )}
      
          <div className="min-h-screen flex flex-col items-center pt-30 px-4 mx-50">
            <div className="w-full max-w-2xl">
      
              {/* channel info */}
              <div className="p-5 rounded-xl shadow mb-15 border border-blue-400 ">
                <h1 className="text-2xl font-bold mb-2 text-center">{channel.title}</h1>
                <p className="text-gray-700 whitespace-pre-wrap text-center">{channel.description}</p>
              </div>
      
              {/* posts */}
              <div className="flex flex-col gap-5 mt-5 ">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="rounded-xl border border-transparent hover:border-blue-400 shadow transition-colors duration-200 bg-white cursor-pointer my-3"
                    onClick={() => navigate(`/channels/${channelId}/post/${post.id}`)}
                  >
                    <h1 className="p-5 font-bold text-lg">{post.title}</h1>
                    <p className="px-5 pb-5 text-gray-700">{post.description}</p>
                  </div>
                ))}
              </div>
              
            </div>
          </div>
        </>
      );
      
}