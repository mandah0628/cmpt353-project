import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className='min-h-screen flex flex-col items-center justify-center mx-50'>
            <h1 className='text-4xl font-bold text-black mb-3 text-center'>
                Welcome to my platform!
            </h1>
            <p className='text-2xl  text-center mb-2'>
                Click the button below to explore all the channels on the platform!
            </p>
            <p className='text-2xl mb-4 text-center'>
                Create a channel and post any questions you have on your mind!
            </p>
            <button 
                className="cursor-pointer bg-blue-400 hover:bg-blue-700 hover:text-white  py-3 px-6 rounded-xl text-xl font-bold shadow transition duration-100"
                onClick={() => navigate("/channels")}
            >
                Channels
            </button>
        </div>
    );
}