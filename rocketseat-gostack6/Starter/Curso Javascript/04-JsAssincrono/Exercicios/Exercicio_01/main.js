var idade = 20

var minhaPromise = function() {
  return new Promise(function(resolve, reject) {
        if (idade >= 18) {
          resolve('Usuário é maior de 18')
        } else {
          reject('Usuário é menor de 18')
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

