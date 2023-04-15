const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite');

class Message {
  static all(callback) {
    db.all('SELECT * FROM messages', (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }

  static create(data, callback) {
    const { author, message } = data;
    db.run('INSERT INTO messages (author, message) VALUES (?, ?)', [author, message], err => {
      if (err) {
        callback(err, null);
      } else {
        db.get('SELECT last_insert_rowid() AS id', (err, row) => {
          if (err) {
            callback(err, null);
          } else {
            const id = row.id;
            db.get(`SELECT * FROM messages WHERE id = ${id}`, (err, row) => {
              if (err) {
                callback(err, null);
              } else {
                callback(null, row);
              }
            });
          }
        });
      }
    });
  }
}

module.exports = Message;

