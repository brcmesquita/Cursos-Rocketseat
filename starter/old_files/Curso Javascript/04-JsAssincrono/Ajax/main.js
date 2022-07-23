var xhr = new XMLHttpRequest() // Inicia o XMLHttpRequest

xhr.open('GET', 'https://api.github.com/users/brcmesquita') // Abre uma conexão assim como um banco de dados
xhr.send(null)

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    console.log(JSON.parse(xhr.responseText)) // Recupera o conteúdo em JSON
  }
}