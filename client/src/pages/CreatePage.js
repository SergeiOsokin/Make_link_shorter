import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';

export const CreatePage = () => {
    const auth = useContext(AuthContext); // получаем контекст в объекте auth
    const history = useHistory(); // может использоваться для редиректа на определенную страницу
    const { request } = useHttp();
    const [link, setLink] = useState('');

    useEffect(() => {
        window.M.updateTextFields();
    });

    const pressHandler = async (event) => {
         
        // return console.log({ from: link })
        if(event.key === 'Enter'){
            try {
                const data = await request('/api/link/generate', 'POST', { from: link }, {
                    Authorization: `Bearer ${auth.token}`,
                    "Content-Type": "application/json"
                });
                history.push(`/detail/${data.link._id}`);
            } catch(e) {}
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" >
                <div className="input-field">
                    <label htmlFor="link">Введите ссылку</label>
                    <input id="link" type="text" placeholder="Вставьте ссылку" name="link"onChange={(event) => setLink(event.target.value)}  onKeyPress={pressHandler} value={link} />
                </div>
            </div>
        </div>
    )
};