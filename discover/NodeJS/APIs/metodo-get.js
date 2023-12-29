const express = require('express');

const app = express();

app.listen('3000');

// middleware
app.use(express.json());

// rotas

app.route('/').get((req, res) => {
  res.send('Hello World! - Sobre');
});
