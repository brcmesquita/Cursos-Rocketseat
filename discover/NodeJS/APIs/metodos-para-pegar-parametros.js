const express = require('express');

const app = express();

app.listen('3000');

// middleware
app.use(express.json());

// let author = 'Bruno Raphael';

// rotas

app.route('/').get((req, res) => {
  res.send('Hello World!');
});

// Formas de pegar parâmetros

// Via route params
app. route('/').get( (req, res) => {
  res.send(req.query.name);
})

// via body params
app.route('/').put( (req, res) => {
  res.send(req.body.author);
})

// via query params
app.route('/:parametro').get((req,res) => {
  res.send(req.params.parametro);
})