import axios from 'axios';
import { useState, useEffect } from 'react';

export default function ChannelListPage() {
    const [channels, setChannels] = useState([]);

    const fetchChannels = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_EXPRESS_MYSQL_BASE_URL}`);
            setChannels(res.data.channels);
        } catch (error) {
            console.error("Error fetching channels:", error.response?.data?.message);

        }
    }


    useEffect(() => {
       fetchChannels();
    }, [])



    return(
        <div className='min-h-screen flex items-center justify-center'>
            {channels.map((channels, index) =>
                <div
                    className=''
                    key={index}
                >
                </div>
            )}
        </div>
    );
}