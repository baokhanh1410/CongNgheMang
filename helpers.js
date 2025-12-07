const moment = require('moment-timezone');

function sanitizeName(name) {
    return name.trim().replace(/[^a-zA-Z0-9\s-]/g, "").replace(/\s+/g, '_').toLowerCase();
}

function createFolderName(userName) {
    const now = moment().tz('Asia/Bangkok');
    const timestamp = now.format('DD_MM_YYYY_HH_mm');
    const sanitizedUser = sanitizeName(userName);
    return `${timestamp}_${sanitizedUser}`;
}

module.exports = { sanitizeName, createFolderName };