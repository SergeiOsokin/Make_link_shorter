const { Router } = require('express');
const config = require('../config/default.json');
const { check, validationResult } = require('express-validator'); // для валидации приходящих данных
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const routerAuth = Router();

routerAuth.post('/register',
    [
        check('email', 'Введите корректный адрес').isEmail(),
        check('password', 'Минимум 6 символов').isLength({ min: 6 })

    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные"
                })
            }
            const { email, password } = req.body;
            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: "User already exist" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({ email, password: hashedPassword });

            await user.save();

            return res.status(201).json("User created");

        } catch (e) {
            res.status(500).json({ message: "Something wrong" })
        }
    });

routerAuth.post('/login',
    [
        check('email', 'Введите корректный адрес').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при входе "
                })
            }
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: "пользователь не найден" })
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: "Неверный логин или пароль" })
            }

            const token = jwt.sign(
                { userId: user.id }, //какие данные зашифровать в токене
                config.jwtSecret, // секртный ключ
                { expiresIn: '1h' } // время жизни токена
            );

            res.json({ token, userId: user.id })

        } catch (e) {
            res.status(500).json({ message: "Something wrong" })
        }
    });

module.exports = { routerAuth }