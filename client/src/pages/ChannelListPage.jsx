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
            <div className='min-h-screen flex items-center justify-center bg-green-50'>
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }


    return(
        <div className='min-h-screen flex items-center justify-center flex-col gap-5'>
            {channels.map((channel, index) => (
                <div
                    className='flex bg-amber-200 flex-col'
                    onClick={() => navigate(`/channels/${channel.id}`)}
                >
                        <h1 
                            key={index} 
                            className='p-5 font-bold w-full text-center'
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