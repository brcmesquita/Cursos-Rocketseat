const res = require('express/lib/response');
const db = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {
  all(callback) {
    db.query(
      'SELECT * FROM pacientes ORDER BY name ASC',
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
    INSERT INTO pacientes (
      name,
      email,
      passwd,
      avatar_url,
      birth,
      gender,
      blood,
      weight,
      height,
      terapeuta_id,
      services,
      phone,
      cellphone,
      address,
      status,
      created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING id
    `;

    const values = [
      data.name,
      data.email,
      data.passwd,
      data.avatar_url,
      date(data.birth).iso,
      data.gender,
      data.blood,
      data.weight,
      data.height,
      data.terapeuta_id,
      data.services,
      data.phone,
      data.cellphone,
      data.address,
      data.status,
      date(Date.now()).iso,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Erro no Banco de Dados! ${err}`;

      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(
      `SELECT pacientes.*, terapeutas.name AS terapeuta_name
      FROM pacientes
      LEFT JOIN terapeutas ON (pacientes.terapeuta_id = terapeutas.id)
      WHERE pacientes.id = $1`,
      [id],
      function (err, results) {
        if (err) throw `Erro no Banco de Dados! ${err}`;
        callback(results.rows[0]);
      },
    );
  },
  update(data, callback) {
    const query = `
    UPDATE pacientes SET
    avatar_url=($1),
    name=($2),
    email=($3),
    passwd=($4),
    birth=($5),
    gender=($6),
    blood=($7),
    weight=($8),
    height=($9),
    terapeuta_id=($10),
    services=($11),
    phone=($12),
    cellphone=($13),
    address=($14),
    status=($15)
    WHERE id = $16
    `;

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      data.passwd,
      date(data.birth).iso,
      data.gender,
      data.blood,
      data.weight,
      data.height,
      data.terapeuta_id,
      data.services,
      data.phone,
      data.cellphone,
      data.address,
      data.status,
      data.id,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Erro na hora de atualizar o paciente! ${err}`;

      callback();
    });
  },
  delete(id, callback) {
    db.query(
      `DELETE FROM pacientes WHERE id = $1`,
      [id],
      function (err, result) {
        if (err) throw `Erro na hora de excluir paciente ${err}`;

        return callback();
      },
    );
  },
  terapeutasSelectOptions(callback) {
    db.query(`SELECT id, name FROM terapeutas`, function (err, results) {
      if (err)
        throw `Erro na hora de buscar os terapeutas na tabela terapeutas: ${err}`;

      return callback(results.rows);
    });
  },
};
