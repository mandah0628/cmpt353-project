import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';
import { useParams } from 'react-router-dom';
import Reply from '../components/Reply';
import ReplyForm from '../components/ReplyForm';

export default function PostPage() {
    const [post, setPost] = useState({});
    const [replies, setReplies] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [postUser, setPostUser] = useState({});
    const [postImage, setPostImage] = useState(null);

    const { postId } = useParams();


    const fetchPostData = async () => {
        try {
            setFetching(true);

            const res = await axiosInstance.get(`/post/get-post/${postId}`);
    
            setPost(res.data.post);
            setReplies(buildReplyTree(res.data.replies));
            setPostImage(res.data.post.image);
            setPostUser(res.data.user);
            
            console.log(res.data.user)
        } catch (error) {
            console.error("Error fetching post:", error.response?.data?.message);
        } finally {
            setFetching(false);
        }
    };


    const calculateTime = (createdAt) => {

        const now = Date.now();
        const timestamp = new Date(createdAt).getTime();
        const difference = now - timestamp;
    
        const hours = Math.floor(difference / 3600000);
        console.log(now)
        console.log(timestamp)
        console.log(difference)
        
    
        if (hours >= 1) {
            return {time: "h", value: hours};
        } else if (hours < 1) {
            return {time:"m", value: Math.floor(difference/60000)}
        }
      }


    useEffect(() => {
        fetchPostData();
    }, []);

    function buildReplyTree(replies) {
        const replyMap = {};
        const rootReplies = [];

        replies.forEach(reply => {
            reply.children = [];
            replyMap[reply.id] = reply;
        });

        replies.forEach(reply => {
            if (reply.parentReplyId) {
                replyMap[reply.parentReplyId]?.children.push(reply);
            } else {
                rootReplies.push(reply);
            }
        });

        return rootReplies;
    }

    if (fetching) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const { value, time } = calculateTime(post.createdAt);

    return (
        <div className="min-h-screen flex flex-col items-center pt-40 px-4">
          
          <div className="w-full max-w-2xl"> 
            
            {/* Post */}
            <div className="flex p-5 rounded shadow mb-6 gap-5">

                {/* post image */}
                {postImage && (
                    <img
                        src={postImage}
                        className='w-65 h-65'
                    />
                )}
                
                {/* post */}
                <div className='flex flex-col'>

                    {/* post info */}
                    <div className='flex items-center'>
                        {/* user profile photo and name */}
                        <div className='flex items-center'>
                            <img
                                src={postUser.image ?? "/default.jpg"}
                                alt="User"
                                className="w-16 h-16"
                            />
                            <p>{postUser.name}</p>
                        </div>
                       
                        <p className='ml-5'>Posted: {value}{time} ago</p>
                        
                        
                    </div>

                    {/* post title and description */}
                    <div>
                        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
                        <p>{post.description}</p>
                    </div>

                </div>
            </div>
      
            {/* add reply form */}
            <ReplyForm 
                postId={postId} onReplyPosted={fetchPostData} 
            />
      
            {/* post replies */}
            <div className="bg-white flex flex-col p-5 gap-5 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-3 text-center">Replies</h2>
              {replies.map(reply => (
                <Reply 
                    key={reply.id} reply={reply} 
                />
              ))}
            </div>
      
          </div>
      
        </div>
      );
      
}

  
