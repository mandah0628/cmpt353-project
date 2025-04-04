import axiosInstance from '../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect, useRef } from 'react';

export default function CreatePostModal({ onClose }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const {channelId} = useParams();

  const {authState, authLoading} = useAuth();
  const navigate = useNavigate();

  const addImageRef = useRef();
  const [image, setImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      validateForm();

      const formData = new FormData();

      formData.append("title", name.trim());
      formData.append("description", description.trim());
      formData.append("channelId", channelId);
      formData.append("image", image);

      const res = await axiosInstance.post("/post/create-post", formData);

      const postId = res.data.postId;

      navigate(`/channel/${channelId}/post/${postId}`)

    } catch (error) {
      console.error("Error creating the post:", error.response?.data?.message || error.message);
    } finally {
      setSubmitting(false);
      onClose();
    }
  };

  const validateForm = () => {
    if (!name || !description) {
      return;
    }
  }

  const handleImageUpload = (e) =>{
    const image = e.target.files[0];
    setImage(image);
  }

  const addImageClick = () => {
    addImageRef.current.click();
  }

  useEffect(() => {
    if (!authState && !authLoading) {
      navigate("/login");
    }
  }, [authLoading,authState, navigate])
  


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-out">
      <div className="bg-white p-6 rounded-xl w-[400px] shadow-xl transform transition-all duration-300 scale-100 opacity-100">

        {/* header */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">Create a Post</h2>

        {/* form */}
        <form onSubmit={handleSubmit}>

          {/* post title */}
          <input
            type="text"
            placeholder="Post title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />

          {/* post description */}
          <textarea
            placeholder="Post description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-4 h-24 resize-none focus:outline-none focus:ring focus:ring-blue-300"
          >
          </textarea>

          {/* image preview */}
          {image && (
             <img 
              className='w-30 h-30 mb-2' 
              src={image ? URL.createObjectURL(image) : null}>
            </img>
          )}


          {/* buttons */}
          <div
            className='flex justify-between'
          >
            {/* add image button */}
            <input
              type='file'
              className='hidden'
              ref={addImageRef}
              onChange={handleImageUpload}
            />

            <button
              type='button'
              className='bg-blue-400 p-4 rounded cursor-pointer'
              onClick={addImageClick}
            >
              Add Image
            </button>

            {/* cancel and create buttons */}
            <div className='flex gap-2'>
              {/* cancel button */}
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                disabled={submitting}
              >
                Cancel
              </button>

              {/* create post button */}
              <button
                type="submit"
                disabled={submitting}
                className={`cursor-pointer px-4 py-2 text-white rounded transition flex items-center justify-center ${
                  submitting
                    ? 'bg-green-500 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {submitting ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Create'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
