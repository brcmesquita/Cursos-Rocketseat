const express = require('express'); // criando o servidor com express.js
const nunjucks = require('nunjucks'); // configurando o nunjucks
const routes = require('./routes'); // arquivo que tem todas as rotas
const methodOverride = require('method-override');

// criando o servidor com express.js
const server = express();

// habilita o req.body
server.use(express.urlencoded({ extend: true }));

// configurando a pasta raiz do projeto, no caso, a public
server.use(express.static('public'));

// serve para fazer com que os forms html recebam mais de um tipo de método
// além do GET e POST. com isto, é possível receber mais tipos de métodos,
// tais como PUT, DELETE etc
// sendo que ele vem sobreescrever o método e precisa ser chamado antes do routes.
server.use(methodOverride('_method'));

// serve para configurar as rotas do servidor
server.use(routes);

// configurando o view engine para ler arquivos com extensão njk (nunjucks)
server.set('view engine', 'njk');

// configurando o nunjucks
nunjucks.configure('views', {
  autoescape: false,
  express: server,
  watch: true,
  noCache: true,
});

// criando o servidor com express.js
server.listen(5000, function () {
  console.log('Servidor rodando...');
});
