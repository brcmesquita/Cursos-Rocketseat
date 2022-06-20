

const texto = document.getElementById('usuario')
const btnEnviar = document.getElementById('btn-enviar')

function buscar() {
  var usuario = texto.value

  const path = "http://api.github.com/users/" + usuario
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
            reject('Erro na requisição')
          }
        }
      }
    })
  }
  
  minhaPromise()
  .then(function(response) {
    console.log(response)
  })
  .catch(function(error) {
    console.warn(error)
  })
  
}

btnEnviar.onclick = buscar

