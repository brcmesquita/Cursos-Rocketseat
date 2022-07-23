const listElement = document.querySelector('#app ul')
const inputElement = document.querySelector('#app input')
const buttonElement = document.querySelector('#app button')

var todos = JSON.parse(localStorage.getItem('list_todos')) || []

function renderTodos() {
  listElement.innerHTML = ''

  for (todo of todos){
    const todoElement = document.createElement('li')
    const todoText = document.createTextNode(todo)

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href','#')
    var linkText = document.createTextNode('Excluir')

    var pos = todos.indexOf(todo)
    linkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')')

    linkElement.appendChild(linkText)
    todoElement.appendChild(todoText)
    todoElement.appendChild(linkElement)
    listElement.appendChild(todoElement)
  }
}

renderTodos()

function addTodo() {
  let text = inputElement.value
  todos.push(text)
  inputElement.value = ''
  renderTodos()
  saveToStorage()
}

buttonElement.onclick = addTodo

function deleteTodo(pos) {
  todos.splice(pos, 1)
  renderTodos()
  saveToStorage()
}

function saveToStorage() {
  localStorage.setItem('list_todos', JSON.stringify(todos))
}


