const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUszenlWUnBFeG9SMms4SmtEU0xIVko3cncxSEU2MVd0RGRxL3lOVTJuOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL1drNXYwWVNMUXluS2ViY2Jaa1Azc0grR1RQZUFhaWJORFN1UndPR0xWdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZT2JlZ1RheFVLRlFKWDFZNVAvTXVoRHkvZFdESDk2anNna0NqRXp3UDJRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsSXZKSjg2NExnWnhEQTVocTA2OXFTMUZOd0ZXOG00VzlJZE5IQVpLaXpvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNLbmN1QmNBZGxJQUJ0dE1qSElHR1BENFJUVE5PWU9BMmNiSitYV2lFbFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRYZ3h3bDV5R1N0NTZoOXRwUTRpNXNRd1ExUVg3RjZCMmM4R1AyVFpva289In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUordVN2TXRLNlpFZklsSno0a2tTRnVnWTdiMytIMXcxZEU1Umt3YitXMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMVF5aDRsS3pKMEUvc1FUenlPTlNLQW03UjR0bEdxZys4TVp2TDNsRXlFWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkM4ei9WbHoyaUJDR2Z4dWlqd2MwaWJnTmtvc2Q5eC9SaGxjbWNyMEFkYk9XaW9DUVFGRFlCSUVzeG0zUFlYQmJMcjhNdVJ6U3VXOGVnZ2xvNUhkdGd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc0LCJhZHZTZWNyZXRLZXkiOiJrNmpoRW43d3J2aWpnNTJLOVdJcDRQQ2tncS85K1pGeDBuTlRJRGtRZzRBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc4MzQ1ODMxMkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1MkM1NjlGOTMzQjZDRUQxNTVEMEY3Q0RFMUZEMTY5QSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxNzA4NDQxfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3ODM0NTgzMTJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiREUwQjYxRTlCRTc0MkVGNTczNDU5MjA1RkEzRUYwNzYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MTcwODQ0MX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiMTIzTE9UVVMiLCJtZSI6eyJpZCI6IjI2Mzc4MzQ1ODMxMjozMUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjE1Mzg1MTc2ODQyMjg0OjMxQGxpZCIsIm5hbWUiOiJzdXByZW1lIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPZVF1NFVHRUlQbW84TUdHQVVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI0K3d5YUphTkdiTGU5NFl6K0lVRjZGK3FPNFBSZ1ZrNVdlRDVjc2x1QkIwPSIsImFjY291bnRTaWduYXR1cmUiOiJOdi9qeHVqdytYUWVUVWM5N2lTOEx6YVVBcnVOU3Juci90azdLR2svRXVLNWZWUGRRNUxlaE4ySmhIelJad2VpTGE3MzF1TlJLSTBsNUlWTFI1bTdDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiaWR4RkRaRDJlZ3NZVjN4b05hOFRMYlU4b3ZuckNFK3h0MUtVeGk3TUNjSzV6bmx2NTg0MVhIeFFiemdkeFZtaFhwb2pQdzJlbE1Xb2x6eVpCV0djZ1E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3ODM0NTgzMTI6MzFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZVBzTW1pV2pSbXkzdmVHTS9pRkJlaGZxanVEMFlGWk9WbmcrWExKYmdRZCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUxNzA4NDMzLCJsYXN0UHJvcEhhc2giOiJubTNCYiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQzQ4In0='
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "DML",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "DML",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'DML-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

