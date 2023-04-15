const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const messagesRouter = require('./app/routes/messages');


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/api/messages', messagesRouter);


const db = new sqlite3.Database('./database.sqlite');

db.run('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, author TEXT, message TEXT)');

app.get('/api/messages', (req, res) => {
  db.all('SELECT * FROM messages', (err, rows) => {
    if (err) {
      res.status(500).send({ error: 'Something went wrong!' });
    } else {
      res.send(rows);
    }
  });
});

app.post('/api/messages', (req, res) => {
  const { author, message } = req.body;
  if (!author || !message) {
    res.status(400).send({ error: 'Author and message are required!' });
  } else {
    db.run('INSERT INTO messages (author, message) VALUES (?, ?)', [author, message], err => {
      if (err) {
        res.status(500).send({ error: 'Something went wrong!' });
      } else {
        res.send('Message posted successfully!');
      }
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));

