const express = require('express');
const routes = express.Router();
const terapeutas = require('./controllers/terapeutas');
const pacientes = require('./controllers/pacientes');

// criando uma rota padrão (tipo index)
routes.get('/', function (req, res) {
  return res.redirect('/terapeutas');
});

/* Rota para os terapeutas */
routes.get('/terapeutas', terapeutas.index); // rota principal, a index / home
routes.get('/terapeutas/create', terapeutas.create); // rota para cadastro de terapeuta
routes.get('/terapeutas/:id', terapeutas.view); // rota para visualização de terapeuta
routes.get('/terapeutas/:id/edit', terapeutas.edit); // rota para edição de terapeuta
routes.post('/terapeutas', terapeutas.post); // não fizemos do tipo post
routes.put('/terapeutas', terapeutas.put); // rota para edição
routes.delete('/terapeutas', terapeutas.delete); // rota para deletar

/* Rota para os pacientes */
routes.get('/pacientes', pacientes.index); // rota principal, a index / home
routes.get('/pacientes/create', pacientes.create); // rota para cadastro de terapeuta
routes.get('/pacientes/:id', pacientes.view); // rota para visualização de terapeuta
routes.get('/pacientes/:id/edit', pacientes.edit); // rota para edição de terapeuta
routes.post('/pacientes', pacientes.post); // não fizemos do tipo post
routes.put('/pacientes', pacientes.put); // rota para edição
routes.delete('/pacientes', pacientes.delete); // rota para deletar

module.exports = routes;
