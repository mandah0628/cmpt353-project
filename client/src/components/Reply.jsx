import { useState } from 'react';
import ReplyForm from './ReplyForm';

export default function Reply({ reply, depth = 0, onReplyPosted }) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const getBase64Image = (buffer) => {
    const binary = String.fromCharCode(...new Uint8Array(buffer.data));
    return `data:image/jpeg;base64,${btoa(binary)}`;
  };


  /**
   * Convers ISO 
   * @param {string} createdAt ISO 8601 time string.
   * @returns 
   */
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

  const imageSrc = reply.image ? getBase64Image(reply.image) : null;
  const userImgSrc = reply.userImage ? getBase64Image(reply.userImage) : "/default.jpg";
  const { value, time } = calculateTime(reply.createdAt);


  return (
    <div className={`ml-${depth * 4} border-l-2 border-gray-300 pl-4`}>
        
        {/* reply data */}
        <div className="bg-white p-3 rounded shadow">


            {/* profile photo, name and date */}
            <div className='flex gap-5 bg-amber-200'>
                <img
                    src={userImgSrc}
                    className='w-10 h-10'
                />
                <h2>{reply.userName}</h2>
                <p>
                    {value}{time}
                </p>
            </div>


            {/* reply comment and image */}
            <div className="flex items-start gap-4">
                {imageSrc && (
                    <img
                        src={imageSrc}
                        alt="reply"
                        className="w-25 h-25 object-cover rounded"
                    />
                )}
                <p className="font-semibold">{reply.comment}</p>


            </div>
            

            {/* button to open the reply form */}
            <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="text-blue-600 hover:underline mt-2 font-semibold"
            >
                {showReplyForm ? 'Cancel' : 'Add Reply'}
            </button>

            
            {/* show reply form if button is pressed */}
            {showReplyForm && (
                <ReplyForm
                    postId={reply.postId}
                    parentReplyId={reply.id}
                    onReplyPosted={() => {
                        setShowReplyForm(false);
                        onReplyPosted?.();
                    }}
                />
            )}
        </div>
        
        
        {/* Render children with increased depth */}
        {reply.children && reply.children.length > 0 && (
            <div>
                {reply.children.map((child) => (
                    <Reply
                        key={child.id}
                        reply={child}
                        depth={depth + 1}
                        onReplyPosted={onReplyPosted}
                    />
                ))}
            </div>
        )}


    </div>
  );
}
