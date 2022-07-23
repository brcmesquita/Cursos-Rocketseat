api.get('http://api.github.com/users/brcmesquita')
  .then(function(response) {
    // console.log(response)
    console.log(response.data.avatar_url) // usamos o data para acessarmos as propriedades da api
  })
  .catch(function(error) {
    console.warn(error)
  })