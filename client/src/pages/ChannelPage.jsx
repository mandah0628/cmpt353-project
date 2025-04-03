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
            <div className='min-h-screen flex items-center justify-center bg-green-50'>
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }


    return(
        <>
            <Header
                onCreatePostClick={() => setShowPostModal(true)}
            />

            {showPostModal && (
                <CreatePostModal 
                    onClose={() => setShowPostModal(false)} 
                />
            )}


            <div className='min-h-screen flex items-center justify-center flex-col gap-5 bg-fuchsia-300 mx-50'>
                
                {/* channel info container */}
                <div>

                </div>

                {/* posts container */}
                <div>
                    {posts.map((post, index) => (
                        <div
                            className='flex bg-amber-200 flex-col gap-4 m-5'
                            onClick={() => navigate(`/channels/${channelId}/post/${post.id}`)}
                        >
                                <h1 
                                    key={index} 
                                    className='p-5 font-bold w-full text-center'
                                >
                                    {post.title}
                                </h1>

                                <p 
                                    key={index}
                                    className='p-5 text-center'
                                >
                                    {post.description}
                                </p>
                        
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}