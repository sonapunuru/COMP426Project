const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 6789;

const db = new sqlite3.Database('./database.sqlite');

db.run(`CREATE TABLE IF NOT EXISTS Users 
        (Onyen TEXT PRIMARY KEY, 
            Name TEXT,
            Email TEXT)`);

db.run(`CREATE TABLE IF NOT EXISTS Crushes 
        (CrushID INTEGER PRIMARY KEY AUTOINCREMENT, 
            CrusherOnyen TEXT,
            CrusheeOnyen TEXT,
            Crush TEXT, 
            Message TEXT,
            FOREIGN KEY (CrusherOnyen) REFERENCES Users (Onyen),
            FOREIGN KEY (CrusherOnyen) REFERENCES Users (Onyen))`);


app.get('/', (req, res) => { res.send('Hello World') })

app.get("/getCrushes", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(port, () => console.log(`Server is listening on port ${port}`));
