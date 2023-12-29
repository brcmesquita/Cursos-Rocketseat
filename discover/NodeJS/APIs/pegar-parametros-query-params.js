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


// -> Aula de como pegar parâmetros através da Query - Query Params

// Os queries são pegos através da URL e são identificados após o sinal de ? Interrogação
/// http://localhost:3000?nome=Raphael

app.route('/').get((req, res) => {
  res.send(req.query.nome);
})

// na rota abaixo, não existe um limite de variáveis, é possível enviar várias via url
// localhost:3000/about/user?username=usuario&password=123456
app.route('/about/user').get((req, res) => {
  res.send(req.query);
})
