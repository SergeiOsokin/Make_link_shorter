import React, { useState, useCallback, useContext, useEffect } from 'react';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import { Loader } from '../components/loader';
import { LinksList } from '../components/linkslist';


export const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const {loading, error, request, clearError} = useHttp();
    const auth = useContext(AuthContext); // получаем контекст в объекте auth

    const fetchLinks = useCallback( async(req, res)=>{
        try{
            const fetched = await request('api/link', 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            });
            setLinks(fetched);
        } catch(e) {};
    }, [auth.token, request]);
    // useEffect вызываем при открытии страницы
    useEffect(()=> {
        fetchLinks();
    }, [fetchLinks]);
    // если идет загрузка, показываем лоадер
    if(loading) {
        return <Loader />
    }

    return(
        <>
            {!loading && <LinksList links={links} />}
        </>
    )
};