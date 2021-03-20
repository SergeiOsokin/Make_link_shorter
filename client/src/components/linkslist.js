import { React } from 'react';
import { Link } from 'react-router-dom';

export const LinksList = ({ links }) => {
    if (!links.length) {
        return (
        <div>
            <h5 className="center-align">Сохраненных ссылок нет</h5>
        </div>
        )
    }
    return (
        <>
            <table className="striped">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Откуда ссылка</th>
                        <th>Количество кликов</th>
                        <th>Дата создания</th>
                        <th>Детали</th>
                    </tr>
                </thead>

                <tbody>
                    {links.map((link, index) => {
                        return (
                            <tr key={link._id}>
                                <td>{index + 1}</td>
                                <td>{link.from}</td>
                                <td>{link.clicks}</td>
                                <td>{new Date(link.date).toLocaleDateString()}</td>
                                <td>
                                    <Link to={`detail/${link._id}`} >Open</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </>
    )
}  