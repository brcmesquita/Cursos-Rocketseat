const res = require('express/lib/response');
const db = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {
  all(callback) {
    db.query(
      `
      SELECT terapeutas.*, count(pacientes) AS total_pacientes
      FROM terapeutas
      LEFT JOIN pacientes ON (pacientes.terapeuta_id = terapeutas.id)
      GROUP BY terapeutas.id
      ORDER BY total_pacientes DESC;
      `,
      function (err, results) {
        if (err) throw `Erro no Banco de Dados! ${err}`;

        callback(results.rows);
      },
    );
  },
  create(data, callback) {
    const keys = Object.keys(data);

    for (key of keys) {
      if (data[key] == '') {
        return res.send('Por favor, preencha todos os campos.');
      }
    }

    const query = `
    INSERT INTO terapeutas (
      name,
      email,
      passwd,
      avatar_url,
      gender,
      services,
      phone,
      cellphone,
      address,
      birth,
      created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id
    `;

    const values = [
      data.name,
      data.email,
      data.passwd,
      data.avatar_url,
      data.gender,
      data.services,
      data.phone,
      data.cellphone,
      data.address,
      date(data.birth).iso,
      date(Date.now()).iso,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Erro no Banco de Dados! ${err}`;

      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(
      `SELECT * FROM terapeutas WHERE id = $1`,
      [id],
      function (err, results) {
        if (err) throw `Erro no Banco de Dados! ${err}`;
        callback(results.rows[0]);
      },
    );
  },
  findBy(filter, callback) {
    db.query(
      `
      SELECT terapeutas.*, count(pacientes) AS total_pacientes
      FROM terapeutas
      LEFT JOIN pacientes ON (pacientes.terapeuta_id = terapeutas.id)
      WHERE terapeutas.name ILIKE '%${filter}%'
      OR terapeutas.services ILIKE '%${filter}%'
      GROUP BY terapeutas.id
      ORDER BY total_pacientes DESC;
      `,
      function (err, results) {
        if (err) throw `Erro no Banco de Dados! ${err}`;

        callback(results.rows);
      },
    );
  },
  update(data, callback) {
    const query = `
    UPDATE terapeutas SET
    avatar_url=($1),
    name=($2),
    email=($3),
    passwd=($4),
    birth=($5),
    gender=($6),
    services=($7),
    phone=($8),
    cellphone=($9),
    address=($10)
    WHERE id = $11
    `;

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      data.passwd,
      date(data.birth).iso,
      data.gender,
      data.services,
      data.phone,
      data.cellphone,
      data.address,
      data.id,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Erro na hora de atualizar o terapeuta! ${err}`;

      callback();
    });
  },
  delete(id, callback) {
    db.query(
      `DELETE FROM terapeutas WHERE id = $1`,
      [id],
      function (err, result) {
        if (err) throw `Erro na hora de excluir terapeuta ${err}`;

        return callback();
      },
    );
  },
  paginate(params) {
    const { filter, limit, offset, callback } = params;

    let query = "",
        queryFilter = "",
        queryTotal = `(SELECT count(*) FROM terapeutas) AS total`;

    if (filter) {
      
      queryFilter = `
        WHERE terapeutas.name ILIKE '%${filter}%'
        OR terapeutas.services ILIKE '%${filter}%'
        `;

      queryTotal = `(
        SELECT count(*) FROM terapeutas
        ${queryFilter}
        ) AS total`
    }

    query = `
      SELECT terapeutas.*, ${queryTotal}, count(pacientes) AS total_pacientes
      FROM terapeutas
      LEFT JOIN pacientes ON (terapeutas.id = pacientes.terapeuta_id)
      ${queryFilter}
      GROUP BY terapeutas.id LIMIT $1 OFFSET $2
      `;

    db.query(query, [limit, offset], function (err, results) {
      if (err) throw `Erro na base de dados! ${err}`;

      callback(results.rows);
    });
  },
};
