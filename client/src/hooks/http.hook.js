//для работы с асинхронными запросами в формате хуков
//useCallback - чтобы реакт не уходил в циклическую рекурсию
import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false); // в useState() указываем начальное состояние в loading  
    const [error, setError] = useState(null);

    const request = useCallback (async (url, method = 'GET', body1 = null, heder = {}) => {
        
        setLoading(true); // начали делать запрос. Меняем состояние
        const body = JSON.stringify(body1);
        const params = method === 'GET' ? { method, headers: heder } : { method, body, headers: heder };

        try{
            const response = await fetch(url, params);
            const data = await response.json(); // получаем ответ
            
            if(!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так');
            }

            setLoading(false); // закончили запрос

            return data;

        } catch(e){
            setLoading(false); 
            setError(e.message);
            throw e;
        }
    }, [])

    const clearError = useCallback(() => setError(null), []); // очищаем ошибки

    return {
        loading,
        error,
        request,
        clearError
    }
}