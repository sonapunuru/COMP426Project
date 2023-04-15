const express = require('express');
const router = express.Router();
const Message = require('../models/message');

router.get('/', (req, res) => {
  Message.all((err, messages) => {
    if (err) {
      res.status(500).send({ error: 'Something went wrong!' });
    } else {
      res.send(messages);
    }
  });
});

router.post('/', (req, res) => {
  const { author, message } = req.body;
  if (!author || !message) {
    res.status(400).send({ error: 'Author and message are required!' });
  } else {
    Message.create({ author, message }, (err, message) => {
      if (err) {
        res.status(500).send({ error: 'Something went wrong!' });
      } else {
        res.send(message);
      }
    });
  }
});

module.exports = router;

