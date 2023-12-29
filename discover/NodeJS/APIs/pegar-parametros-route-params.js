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


// -> Aula como pegar os Params via Rota - Route Params

// preciso dessa rota vazia para quando não clicar em nada não fique mostrando erro
app.route('/').get((req, res) => { 
  res.send( "Olá!" );
});

// http://localhost:3000/Raphael
app.route('/:nome').get((req, res) => {
  res.send( req.params.nome );
});

// http://localhost:3000/identidade/Raphael
app.route('/identidade/:nome').get((req, res) => {
  res.send( req.params.nome );
});