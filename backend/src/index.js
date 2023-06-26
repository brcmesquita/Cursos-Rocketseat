const express = require('express');

const app = express();

app.use(express.json());

app.get('/projects', (request, response)=> {
  // Modo padrão
  // const query = request.query;
  // console.log(query);

  // Modo com Destructuring Assignement
  const {title, owner} = request.query;
  console.log(title);
  console.log(owner);

  //return response.send('Hello World!');
  //return response.json({message: "Hello World! De novo!"});
  return response.json([
    "Projeto 1",
    "Projeto 2"
  ]);
});

app.post("/projects", (request, response) => {
  const body = request.body;
  console.log(body);

  return response.json([
    "Projeto 1",
    "Projeto 2",
    "Projeto 3"
  ]);
});

app.put("/projects/:id", (request, response) => {
  // Modo Padrão
  // const params = request.params;
  // console.log(params);

  // Modo com desestruturação
  const { id } = request.params;
  console.log(id);

  return response.json([
    "Projeto 4",
    "Projeto 2",
    "Projeto 3"
  ]);
});

app.delete("/projects/:id", (request, response) => {
  return response.json([
    "Projeto 2",
    "Projeto 3"
  ]);
});

app.listen(3333, ()=>{
  console.log("👨‍🚀🚀Server started!")
});