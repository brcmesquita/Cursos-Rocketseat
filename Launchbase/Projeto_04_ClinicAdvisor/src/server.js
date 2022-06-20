const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const methodOverride = require('method-override');

const server = express();

server.use(express.urlencoded({ extend: true }));

server.use(express.static('public'));

server.use(methodOverride('_method'));

server.use(routes);

server.set('view engine', 'njk');

nunjucks.configure('src/app/views', {
  autoescape: false,
  express: server,
  watch: true,
  noCache: true,
});

server.listen(5000, function () {
  console.log('Servidor rodando...');
});
