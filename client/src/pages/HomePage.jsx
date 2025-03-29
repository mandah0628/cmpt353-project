import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();


    return (
        <div className='min-h-screen flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-bold text-black mb-6 text-center'>
                Hola
            </h1>

            <button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow transition duration-200"
                onClick={() => navigate("/channels")}
            >
                Channels
            </button>
        </div>
    );
}