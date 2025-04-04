import { useState } from 'react';
import axiosInstance from '../utils/axios';
import { useNavigate } from 'react-router-dom';

export default function ReplyForm({ postId, onReplyPosted, parentReplyId=null}) {
    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) {
            return;
        }

        const formData = new FormData();
        formData.append('comment', comment);
        formData.append('postId', postId);

        if (parentReplyId) {
            formData.append("parentReplyId", parentReplyId);
        }
        
        if (image) {
            formData.append('image', image);
        }

        try {
            setSubmitting(true);
            const res = await axiosInstance.post('/reply/create-reply', formData);

            setComment('');
            setImage(null);
            onReplyPosted(); 


        } catch (error) {
            console.error('Error posting reply:', error.response?.data?.message);
            if (error.response?.status === 401) {
                navigate("/login");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 rounded shadow mb-6">

            {/*comment and image preview*/}
            <div
                className="flex flex-col w-full p-2 border border-gray-300 rounded mb-2 
                focus-within:border-blue-400 
                focus-within:ring-1 
                focus-within:ring-blue-400 
                transition-colors duration-200"
            >
                {/* image preview */}
                {image && (
                    <div
                        className='mb-2'
                    >
                        <img
                            src={URL.createObjectURL(image)}
                            className='w-24 h-24 object-cover rounded'
                        />
                    </div>
                )}

                {/* reply text area */}
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your reply..."
                    rows={4}
                    className="focus:outline-none"
                />
            </div>


            {/*add Image and post reply buttons */}
            <div className=' flex justify-between font-semibold'>
                <label 
                    className="bg-blue-400 text-black  px-4 py-2 rounded hover:bg-blue-600 hover:text-white 
                    transition-colors duration-200 cursor-pointer"
                >
                    Add Image
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="hidden"
                    />
                </label>

                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-400 text-black  px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition-colors duration-200 disabled:opacity-50 cursor-pointer"
                >
                    {submitting ? 'Posting...' : 'Post Reply'}
                </button>
            </div>
            
        </form>
    );
}
