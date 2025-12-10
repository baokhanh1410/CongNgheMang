const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');
const { createFolderName } = require('../utils/helpers');

const VALID_TOKEN = '123456';
const UPLOAD_DIR = path.join(__dirname, '../uploads');

// Config Multer
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }
});

// API: Bắt đầu Session
router.post('/session/start', (req, res) => {
    const { token, userName } = req.body;
    if (token !== VALID_TOKEN) return res.status(401).send({ error: 'Token sai.' });

    try {
        const folderName = createFolderName(userName);
        const userDirPath = path.join(UPLOAD_DIR, folderName);
        if (!fs.existsSync(userDirPath)) fs.mkdirSync(userDirPath, { recursive: true });

        const metadata = {
            userName,
            startedAt: moment().tz('Asia/Bangkok').toISOString(),
            questionsReceived: []
        };
        fs.writeFileSync(path.join(userDirPath, 'meta.json'), JSON.stringify(metadata, null, 2));
        res.json({ ok: true, folder: folderName });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Lỗi server tạo session.' });
    }
});

// API: Upload Video
router.post('/upload-one', upload.single('video'), (req, res) => {
    const { token, folder, questionIndex } = req.body;
    const file = req.file;

    if (token !== VALID_TOKEN || !file) return res.status(400).send({ error: 'Thiếu dữ liệu.' });

    try {
        const userDirPath = path.join(UPLOAD_DIR, folder);
        const savedAs = `Q${questionIndex}.webm`;
        fs.writeFileSync(path.join(userDirPath, savedAs), file.buffer);

        // Update Meta
        const metaPath = path.join(userDirPath, 'meta.json');
        if (fs.existsSync(metaPath)) {
            let metadata = JSON.parse(fs.readFileSync(metaPath));
            metadata.questionsReceived.push({
                index: questionIndex,
                file: savedAs,
                time: moment().tz('Asia/Bangkok').toISOString()
            });
            fs.writeFileSync(metaPath, JSON.stringify(metadata, null, 2));
        }
        res.json({ ok: true });
    } catch (error) {
        res.status(500).send({ error: 'Lỗi lưu file.' });
    }
});

// API: Kết thúc Session
router.post('/session/finish', (req, res) => {
    const { token, folder, questionsCount } = req.body;
    if (token !== VALID_TOKEN) return res.status(400).send({ error: 'Token sai.' });

    try {
        const metaPath = path.join(UPLOAD_DIR, folder, 'meta.json');
        if (fs.existsSync(metaPath)) {
            let metadata = JSON.parse(fs.readFileSync(metaPath));
            metadata.finishedAt = moment().tz('Asia/Bangkok').toISOString();
            metadata.totalQuestions = questionsCount;
            fs.writeFileSync(metaPath, JSON.stringify(metadata, null, 2));
        }
        res.json({ ok: true });
    } catch (error) {
        res.status(500).send({ error: 'Lỗi finish session.' });
    }
});

module.exports = router;