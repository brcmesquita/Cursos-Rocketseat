const express = require('express');
const routes = express.Router();
const terapeutas = require('./app/controllers/terapeutas');
const pacientes = require('./app/controllers/pacientes');

routes.get('/', function (req, res) {
  return res.redirect('/terapeutas');
});

routes.get('/terapeutas', terapeutas.index);
routes.get('/terapeutas/create', terapeutas.create);
routes.get('/terapeutas/:id', terapeutas.view);
routes.get('/terapeutas/:id/edit', terapeutas.edit);
routes.post('/terapeutas', terapeutas.post);
routes.put('/terapeutas', terapeutas.put);
routes.delete('/terapeutas', terapeutas.delete);

routes.get('/pacientes', pacientes.index);
routes.get('/pacientes/create', pacientes.create);
routes.get('/pacientes/:id', pacientes.view);
routes.get('/pacientes/:id/edit', pacientes.edit);
routes.post('/pacientes', pacientes.post);
routes.put('/pacientes', pacientes.put);
routes.delete('/pacientes', pacientes.delete);

module.exports = routes;
