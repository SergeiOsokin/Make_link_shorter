const { Router } = require('express');
const routerRedirect = Router();
const Link = require('../models/Link');

routerRedirect.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({ code: req.params.code })

        if (!link) {
            return res.status(404).json({ message: "Ссылка не найдена" })
        }

        link.clicks++; // нажали на ссылку, счетчик увеливаем
        await link.save();
        return res.redirect(link.from);

    } catch (e) {
        res.status(500).json({ message: "Something wrong" })
    }
});

module.exports = { routerRedirect };