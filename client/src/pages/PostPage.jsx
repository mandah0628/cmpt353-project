import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';
import { useParams } from 'react-router-dom';
import Reply from '../components/Reply';
import ReplyForm from '../components/ReplyForm';

export default function PostPage() {
    const [post, setPost] = useState({});
    const [replies, setReplies] = useState([]);
    const [fetching, setFetching] = useState(true);

    const { postId } = useParams();


    const fetchPostData = async () => {
        try {
            setFetching(true);

            const res = await axiosInstance.get(`/post/get-post/${postId}`);
            
            setPost(res.data.post);
            setReplies(buildReplyTree(res.data.replies));

        } catch (error) {
            console.error("Error fetching post:", error.response?.data?.message);
        } finally {
            setFetching(false);
        }
    };



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
            <div className='min-h-screen flex items-center justify-center bg-green-50'>
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center pt-40 px-4">
          
          <div className="w-full max-w-2xl"> 
            
            {/* Post */}
            <div className="p-5 rounded shadow mb-6">
              <h1 className="text-2xl font-semibold mb-2 text-center">{post.title}</h1>
              <p className="whitespace-pre-wrap text-center">{post.description}</p>
            </div>
      
            {/* Add Reply */}
            <ReplyForm postId={postId} onReplyPosted={fetchPostData} />
      
            {/* Replies */}
            <div className="bg-white flex flex-col p-5 gap-5 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-3 text-center">Replies</h2>
              {replies.map(reply => (
                <Reply key={reply.id} reply={reply} />
              ))}
            </div>
      
          </div>
      
        </div>
      );
      
}

  
