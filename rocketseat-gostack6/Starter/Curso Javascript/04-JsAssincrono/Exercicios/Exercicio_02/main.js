const tela = document.getElementById('app')
const texto = document.createElement('input')
const lista = document.createElement('ul')
const botao = document.createElement('button')
botao.textContent = "Buscar"
botao.onclick = buscar

function renderControles() {
  tela.appendChild(texto)
  tela.appendChild(botao)
  tela.appendChild(lista)
}

renderControles()

function buscar() {
  tela.innerHTML = ''
  tela.innerHTML = '<div>Carregando...</div>'
  var usuario = texto.value

  const path = "http://api.github.com/users/" + usuario + "/repos"
  const metodo = 'GET'

  var minhaPromise = function() {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest()
      xhr.open(metodo, path)
      xhr.send(null)
  
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText))
          } else {
            reject('Usuário não existe')
          }
        }
      }
    })
  }
  // brcmesquita
  minhaPromise()
  .then(function(response) {
    tela.innerHTML = ''

    renderControles()

    for (let i of response) {
      const item = document.createElement('li')
      item.innerHTML = i.name
      lista.appendChild(item)
    }

  })
  .catch(function(error) {
    console.warn(error)
    tela.innerHTML = '<div>Usuário não encontrado</div>'
    
  })
  
}



