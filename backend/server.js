const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/session');

const app = express();
const PORT = 3000;
const UPLOAD_DIR = path.join(__dirname, 'uploads');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tạo folder uploads nếu chưa có
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
}

// Routes
app.use('/api', authRoutes);
app.use('/api', sessionRoutes);

app.listen(PORT, () => {
    console.log(`✅ Server Backend đang chạy tại http://localhost:${PORT}`);
});