import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import { Loader } from '../components/loader';
import { LinkCard } from '../components/linkcard';

export const DetailPage = () => {
    const [link, setLink] =  useState(null);
    const {loading, error, request, clearError} = useHttp();
    const auth = useContext(AuthContext); // получаем контекст в объекте auth
    const linkId = useParams().id; // читаем параметры url. id - потому что в роуте мы так указали данный параметр path='/detail/:id'

    const getLink = useCallback (async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`,
            })
            setLink(fetched);
        } catch(e) {};
    }, [auth.token, linkId, request]);

    // вызываем функцию getLink для запроса ссылки
    useEffect(()=> {
        getLink();
    }, [getLink]);

    if(loading){
        return (<Loader />) 
    }
    // если все удачно показываем карточку ссылки
    return(
        <>
            {!loading && link && <LinkCard link={link} />}
        </>
    )
};