import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className='min-h-screen flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-bold text-black mb-6 text-center'>
                Hola
            </h1>

            <button 
                className="bg-blue-400 hover:bg-blue-700 hover:text-white  py-3 px-6 rounded-xl text-xl font-bold shadow transition duration-100"
                onClick={() => navigate("/channels")}
            >
                Channels
            </button>
        </div>
    );
}