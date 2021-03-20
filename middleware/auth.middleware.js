const config = require('../config/default.json');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return res.status(401).json({message: 'Не авторизованы'});
        }
        const decoded = jwt.verify(token, config.jwtSecret); // раскодируем токен
        req.user = decoded; // записываем айди пользовавателя в новое поле, что бы он появился и можно было искать его ссылки
        next();
    } catch(e) {
        return res.status(401).json({message: 'Не авторизованы'});
    }
}