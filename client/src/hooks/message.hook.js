//для работы с всплывающими сообщениями
//useCallback - чтобы реакт не уходил в циклическую рекурсию
// window.M - выводить ошибки. появляется при подключении import 'materialize-css'
import {useCallback} from 'react';

export const useMessage = () => {
    return useCallback(text => {
        if (window.M && text) {
            window.M.toast({html: text})
        }
    }, []);
}