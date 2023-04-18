const express = require("express");
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite');

router.get('/', (req, res) => {
    db.all('SELECT * FROM Crushes', (err, rows) => {
        res.send(rows);
    });
  });
  

module.exports = router;