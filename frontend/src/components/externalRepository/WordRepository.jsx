import { useEffect } from 'react';
import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;
console.log(process.env.REACT_APP_BACKEND_BASE_URL);
const axiosInstance = axios.create({
    baseURL: baseURL
});

const WordRepository = ({ onLoad, onSetWords, onSpeak }) => {
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/vocab_entries');
            onSetWords(response.data);
            onSpeak();
            onLoad();
        } catch (error) {
            console.error(error);
        }
    }

    return null;
}

export default WordRepository;