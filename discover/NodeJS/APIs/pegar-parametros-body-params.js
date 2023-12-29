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

// Body Params

app.route('/').post( (req, res) => {
  const {userId, nome, email} = req.body;
  res.send(`User ID: ${userId} Name: ${nome} E-mail: ${email}`);
})

