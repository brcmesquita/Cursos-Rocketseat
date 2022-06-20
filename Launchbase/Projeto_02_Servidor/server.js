const express = require('express'); // criando o servidor com express.js
const nunjucks = require('nunjucks'); // configurando o nunjucks

// criando o servidor com express.js
const server = express();

// arquivo data.js que será o meu banco de dados local
const clientes = require('./data');

// configurando a pasta raiz do projeto, no caso, a public
server.use(express.static('public'));

// configurando o view engine para ler arquivos com extensão njk (nunjucks)
server.set('view engine', 'njk');

// configurando o nunjucks
nunjucks.configure('views', {
  express: server,
  autoescape: false,
});

// criando uma rota padrão (tipo index)
server.get('/', function (req, res) {
  const about = {
    avatar_url: 'https://avatars.githubusercontent.com/u/13441032?v=4',
    name: 'Bruno Raphael',
    role: 'Desenvolvedor Web',
    description: 'Desenvolvimento de Sites, Sistemas e Aplicativos Mobile.',
    social: [
      { name: 'Github', url: 'https://www.github.com/brcmesquita/' },
      { name: 'Linkedin', url: 'https://www.linkedin.com/in/brcmesquita/' },
      { name: 'Instagram', url: 'https://www.instagram.com/brcmesquita/' },
      { name: 'Twitter', url: 'https://www.twitter.com/brcmesquita/' },
      { name: 'YouTube', url: 'https://www.youtube.com/' },
    ],
  };

  return res.render('about', { about });
});

// criando a rota para portfolio
server.get('/portfolio', function (req, res) {
  return res.render('portfolio', { items: clientes });
});

// criando o servidor com express.js
server.listen(5000, function () {
  console.log('Servidor rodando...');
});
