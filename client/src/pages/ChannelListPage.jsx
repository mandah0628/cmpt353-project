import axiosInstance from '../utils/axios';
import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom'

export default function ChannelListPage() {
    const [channels, setChannels] = useState([]);
    

    const [fetching, setFetching] = useState(true);
    
    const navigate = useNavigate();

    const fetchChannels = async () => {
        try {
            const res = await axiosInstance.get("/channel/get-channels");
            setChannels(res.data.channels);
        } catch (error) {
            console.error("Error fetching channels:", error.response?.data?.message);
        } finally {
            setFetching(false);
        }
    }



    useEffect(() => {
       fetchChannels();
    }, []);


    if (fetching) {
        return(
            <div className='min-h-screen flex items-center justify-center'>
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }


    return(
        <div className='min-h-screen  flex flex-col items-center pt-30 mx-50'>
            {channels.map((channel, index) => (
                <div
                    className='flex flex-col mb-5 w-full rounded-xl border border-transparent hover:border-blue-400 shadow transition-colors duration-200 cursor-pointer'
                    onClick={() => navigate(`/channels/${channel.id}`)}
                >
                        <h1 
                            key={index} 
                            className='p-5 font-bold w-full text-center text-2xl'
                        >
                            {channel.title}
                        </h1>

                        <p 
                            key={index}
                            className='p-5 text-center'
                        >
                            {channel.description}
                        </p>
                
                </div>
            ))}
        </div>
    );
}