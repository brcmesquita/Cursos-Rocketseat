const express = require('express');

const app = express();

app.listen('3000');

// middleware
app.use(express.json());

// rotas

app.route('/').get((req, res) => {
  res.send('Hello World! - Sobre');
});

app.route('/').post( (req, res) => {
  console.log(req.body);
  res.send(req.body);
})