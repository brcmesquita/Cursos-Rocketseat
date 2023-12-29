const express = require('express');

const app = express();

app.listen('3000');

// middleware
app.use(express.json());

let author = 'Bruno Raphael';

// rotas

app.route('/').get((req, res) => {
  res.send('Hello World!');
});

app.route('/').put( (req, res) => {
  author = req.body;
  author2 = req.body.author;
  console.log(author2);
  res.send(author);
})