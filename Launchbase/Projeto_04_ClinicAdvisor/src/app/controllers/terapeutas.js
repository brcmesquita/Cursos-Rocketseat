const Terapeuta = require('../models/terapeutas');
const { age, date } = require('../../lib/utils');
const { param } = require('express/lib/request');

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 2;
    let offset = limit * (page - 1);

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(terapeutas) {

        const pagination = {
          total: Math.ceil(terapeutas[0].total / limit),
          page
        }
        return res.render('terapeutas/index', { terapeutas, pagination, filter });
      },
    };

    Terapeuta.paginate(params);

  },

  create(req, res) {
    return res.render('terapeutas/create');
  },

  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Por favor, preencha todos os campos.');
      }
    }

    Terapeuta.create(req.body, function (terapeuta) {
      return res.redirect(`/terapeutas/${terapeuta.id}`);
    });
  },

  view(req, res) {
    Terapeuta.find(req.params.id, function (terapeuta) {
      if (!terapeuta) return res.send('Terapeuta não encontrado!');

      terapeuta.age = age(terapeuta.birth);
      terapeuta.services = terapeuta.services.split(',');

      terapeuta.created_at = date(terapeuta.created_at).format;

      return res.render('terapeutas/view', { terapeuta });
    });
  },
  edit(req, res) {
    Terapeuta.find(req.params.id, function (terapeuta) {
      if (!terapeuta) return res.send('Terapeuta não encontrado!');

      terapeuta.birth = date(terapeuta.birth).iso;

      return res.render('terapeutas/edit', { terapeuta });
    });
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Por favor, preencha todos os campos.');
      }
    }

    Terapeuta.update(req.body, function () {
      return res.redirect(`/terapeutas/${req.body.id}`);
    });
  },
  delete(req, res) {
    Terapeuta.delete(req.body.id, function () {
      return res.redirect(`/terapeutas`);
    });
  },
};
