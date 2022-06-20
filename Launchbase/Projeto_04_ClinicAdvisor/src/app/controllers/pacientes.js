const Paciente = require('../models/pacientes');
const { age, date } = require('../../lib/utils');
const pacientes = require('../models/pacientes');

module.exports = {
  index(req, res) {
    Paciente.all(function (pacientes) {
      return res.render('pacientes/index', { pacientes });
    });
  },

  create(req, res) {
    Paciente.terapeutasSelectOptions(function (options) {
      return res.render('pacientes/create', { terapeutaOptions: options });
    });
  },

  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Por favor, preencha todos os campos.');
      }
    }

    Paciente.create(req.body, function (paciente) {
      return res.redirect(`/pacientes/${paciente.id}`);
    });
  },

  view(req, res) {
    Paciente.find(req.params.id, function (paciente) {
      if (!paciente) return res.send('Paciente não encontrado!');

      paciente.age = age(paciente.birth);
      paciente.birth = date(paciente.birth).birthDay;
      paciente.created_at = date(paciente.created_at).format;

      return res.render('pacientes/view', { paciente });
    });
  },

  edit(req, res) {
    Paciente.find(req.params.id, function (paciente) {
      if (!paciente) return res.send('Paciente não encontrado!');

      paciente.birth = date(paciente.birth).iso;

      Paciente.terapeutasSelectOptions(function (options) {
        return res.render('pacientes/edit', {
          paciente,
          terapeutaOptions: options,
        });
      });
    });
  },

  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Por favor, preencha todos os campos.');
      }
    }

    Paciente.update(req.body, function () {
      return res.redirect(`/pacientes/${req.body.id}`);
    });
  },

  delete(req, res) {
    Paciente.delete(req.body.id, function () {
      return res.redirect(`/pacientes`);
    });
  },
};
