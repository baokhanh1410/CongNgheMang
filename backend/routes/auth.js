const express = require('express');
const router = express.Router();

const VALID_TOKEN = '123456';

router.post('/verify-token', (req, res) => {
    const { token } = req.body;
    if (token == VALID_TOKEN) {
        return res.json({ ok: true });
    }
    res.status(401).send({ error: 'Token không hợp lệ' });
});

module.exports = router;