// módulo do NodeJS chamado File System,
// para que a gente possa usar o Sistema de Arquivos,
// ou seja, para que possamos armazenar dados em arquivos locais
const fs = require('fs');

// agora vamos importar o arquivo data.json para o nosso projeto
const data = require('../data.json');

// importar o arquivo utils para usar a função de verificar idade da pessoa
const { age, date } = require('../utils');

exports.index = function (req, res) {
  return res.render('terapeutas/index', { terapeutas: data.terapeutas });
}; // index/home/início

exports.create = function (req, res) {
  return res.render('terapeutas/create');
}; // create

exports.post = function (req, res) {
  // criando uma forma de validar todos os campos
  const keys = Object.keys(req.body);

  // iterar por cada key para verificar cada campo se está vazio
  for (key of keys) {
    //  req.body.key == ""
    if (req.body[key] == '') {
      return res.send('Por favor, preencha todos os campos.');
    }
  }

  // aqui será a desetruturação de dados (destructuring assignement) para organização dos dados mais tarde
  let { avatar_url, birth, name, services, gender } = req.body;

  // precisamos converter a data de nascimento que recebemos para o padrão timestamp
  birth = Date.parse(req.body.birth);

  // aqui é para criar uma data para cadastrar o dia em que o terapeuta foi cadastrado no sistema
  const created_at = Date.now();

  // para identificar, ou seja, criar um id para cada terapeuta, para que possam ser
  // manipulados mais tarde, vamos criar um id para cada inserção no banco.
  // como todo array começa pelo número 0, utilizaremos um +1 para que a primeira entrada
  // seja cadastrada como 1 (ao invés de 0 - zero), e as demais sigam esta numeração.
  const id = Number(data.terapeutas.length + 1);

  // criado para marcar os colaboradores que fazem ou não parte do corpo clínico
  // quando sim, será true.
  // quando não, será false.
  const working = true;

  // apenas para fins didáticos, esse abaixo era a forma original que era para gravarmos os dados.
  //data.terapeutas.push(req.body);

  // abaixo segue a nova forma de gravação com desestruturação de dados
  // o data agora é um objeto requerido no projeto
  // terapeutas é uma propriedade
  // push é para adicionar conteúdo à propriedade
  // nesse ponto iremos organizar como os dados entram (ordem de escrita), que só possível devido à desestruturação
  data.terapeutas.push({
    id,
    name,
    birth,
    gender,
    services,
    avatar_url,
    working,
    created_at,
  });

  // sintaxe para criação de arquivos se não existir, e de alteração no arquivo se já existir
  // com uma callback function err para saber se deu erro ou não. com isso o programa não fica travado
  // o fs.writeline recebe os dados como string. Para isso estamos usando o JSON.stringify para
  // transformar os dados do tipo JSON em String, senão não funciona.
  // no JSON.stringify há 3 parâmetros:
  // 1º é o valor que vai receber e transformar em string.
  // 2º vamos deixar null
  // 3º é para organizar o arquivo e deixar uma identação, nesse caso, de 2 espaços para cada nível.
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send('Erro na gravação do arquivo.');
    }

    // o redirect serve para redirecionar a página de formulário para a página
    // dos terapeutas, ao invés de continuar na página de formulários
    return res.redirect('/');
  });

  // essa linha foi comentada, pois senão ela iria mostrar uma página em branco
  // com os dados da requisição, ao invés de retornar para a página de terapeutas
  // mas mantive a mesma para fins de teste e didática
  //return res.send(req.body);
}; // post

exports.view = function (req, res) {
  // req.params
  // aqui usamos a desetruturação para encontrar o terapeuta pelo id
  const { id } = req.params;

  // aqui criamos uma constante que vai receber os dados do terapeuta encontrado no sistema.
  // o comando find sempre espera um retorno de true ou false.
  const findTerapeuta = data.terapeutas.find(function (terapeuta) {
    return terapeuta.id == id;
  });

  // se não encontrar o id do terapeuta, retornará a mensagem: 'Terapeuta não encontrado.'
  if (!findTerapeuta) {
    return res.send('Terapeuta não encontrado.');
  }

  // usando spread operator. ele pega tudo e coloca ali dentro
  // sendo que tudo o que estiver após a primeira vírgula, ele vai desconsiderar.
  const terapeuta = {
    ...findTerapeuta,
    age: age(findTerapeuta.birth),
    // o split transforma uma string em um array, separados pelo parâmetro, neste caso, a vírgula
    services: findTerapeuta.services.split(','),
    created_at: Intl.DateTimeFormat('pt-BR').format(findTerapeuta.created_at),
  };

  // ao invés do res.send, que envia algo para a tela, usaremos o res.render, para renderizar os dados na tela, e colocamos o path até o arquivo que será renderizado.
  // return res.send(findTerapeuta);
  return res.render('terapeutas/view', { terapeuta: terapeuta });
}; // read/show/mostrar dados

exports.edit = function (req, res) {
  // estes dados foram pegos da api read/show para reutilização, pois são o mesmo código
  const { id } = req.params;

  const findTerapeuta = data.terapeutas.find(function (terapeuta) {
    return terapeuta.id == id;
  });

  if (!findTerapeuta) return res.send('Terapeuta não encontrado.');
  // aqui termina a parte de reutilização de código

  const terapeuta = {
    ...findTerapeuta,
    birth: date(findTerapeuta.birth).iso,
  };

  return res.render('terapeutas/edit', { terapeuta });
}; // update/edit

exports.put = function (req, res) {
  const { id } = req.body;
  let index = 0;

  // o index foi adicionado para localizar o índice do conteúdo que será alterado
  const findTerapeuta = data.terapeutas.find(function (terapeuta, findIndex) {
    if (id == terapeuta.id) {
      index = findIndex;
      return true;
    }
  });

  if (!findTerapeuta) return res.send('Terapeuta não encontrado.');

  const terapeuta = {
    ...findTerapeuta,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),
  };

  data.terapeutas[index] = terapeuta;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send('Erro ao gravar o arquivo.');

    return res.redirect(`/terapeutas/${id}`);
  });
}; // put

// delete
exports.delete = function (req, res) {
  const { id } = req.body;

  const filtrarTerapeutas = data.terapeutas.filter(function (terapeuta) {
    return terapeuta.id != id;
  });

  data.terapeutas = filtrarTerapeutas;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send('Erro ao gravar no arquivo!');

    return res.redirect('/terapeutas');
  });
};
