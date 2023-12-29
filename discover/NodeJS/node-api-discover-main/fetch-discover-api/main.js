const url = 'http://localhost:5500/api';

function getUsers() {
  fetch(url)
    // .then(response => console.log(response.json()))
    .then(response => response.json())
    .then(data => renderApiResult.textContent = JSON.stringify(data))
    .catch(error => console.error('error message:', error));
}

function getUser(id){
  fetch(`${url}/${id}`)
    .then(response => response.json())
    .then(data => {
      username.textContent = data.name;
      userCity.textContent = data.city;
      userAvatar.src = data.avatar;
    })
    .catch(error => console.error('error message:', error));
}

function addUser(newUser){
  fetch(url, {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {"Content-type":"application/json;charset=UTF-8"}
  })
    .then(response => response.json())
    .then(data => alertApi.textContent = data)
    .catch(error => console.error('error message:', error));
}

const newUser = {
  name: "Greta Van Fleet",
  avatar: "http://picsum.photos/200/300",
  city: "Frankenmuth"
}

function updateUser(updatedUser, id) {
  fetch(`${url}/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedUser),
    headers: {"Content-type" : "application/json;charset=UTF-8"}
  })
    .then(response => response.json())
    .then(data => alertApi.textContent = data)
    .catch(error => console.error('error message:', error));
}

const updatedUser = {
  name: "Bruno Raphael",
  avatar: "http://picsum.photos/200/300",
  city: "Aracaju"
}

function deleteUser(id) {
  fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {"Content-type" : "application/json;charset=UTF-8"}
  })
    .then(response => response.json())
    .then(data => alertApi.textContent = data)
    .catch(error => console.error('error message:', error));
}


updateUser(updatedUser, 8);
addUser(newUser);
getUsers();
getUser(1);
deleteUser(5);
