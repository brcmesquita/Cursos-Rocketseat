const express = require('express');
const axios = require('axios');

const app = express();

app.listen('3000');

// middleware
app.use(express.json());

// rotas
app.route('/').get((req, res) => {
  // res.send('Hello');
  axios.get('https://api.github.com/users/brcmesquita')
  // .then(result => res.send(result.data)) // aqui trás todos os dados no data
  // .then(result => res.send(result.data.avatar_url)) // aqui a gente pega somente o avatar_url
  .then(result => res.send(`<img src="${result.data.avatar_url}">`))
  .catch(error => console.log(error));
})




