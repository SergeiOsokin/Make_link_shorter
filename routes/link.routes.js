const { Router } = require('express');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware');
const shortid = require('shortid')
const config = require('../config/default.json');

const routerLink = Router();

routerLink.post('/generate', auth, async (req, res) => {
    try {

        const { from } = req.body;
        const code = shortid.generate();
        const to = config.baseUrl + '/t/' + code;
        const existing = await Link.findOne({ from });

        if (existing) {
            return res.json({ link: existing });
        }

        const link = new Link({ from, to, code, owner: req.user.userId });

        await link.save();

        return res.status(201).json({ link });

    } catch (e) {
        res.status(500).json({ message: "Something wrong" })
    }
})

routerLink.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId });// req.user появился из ../middleware/auth.middleware, userId записываем при авторизации
        res.json(links);
    } catch (e) {
        res.status(500).json({ message: "Something wrong" })
    }
});

routerLink.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        res.json(link);
    } catch (e) {
        res.status(500).json({ message: "Something wrong" })
    }
});

module.exports = { routerLink };