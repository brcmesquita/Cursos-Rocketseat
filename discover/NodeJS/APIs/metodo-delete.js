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

app.route('/').get((req, res) => {
  console.log(author);
  console.log(req.body.author);
  res.send('Hello World!');
});

app.route('/:identificador').delete( (req, res) => {
  res.send(req.params.identificador);
})