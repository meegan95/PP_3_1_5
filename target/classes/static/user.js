
const tableOneUser = document.getElementById('tableOneUser')
const currentUserLogin = document.getElementById('currentUserLogin')
const currentUserRoles = document.getElementById('currentUserRoles')

const url = 'http://localhost:8080/users'


// Таблица пользователя
fetch(url)
    .then(response => response.json())
    .then(data => {
        let columnElement = ''
        let columnElement2 = ''
        data.forEach(userFromRequest => {
            if (userFromRequest.username === currentUserLogin.innerText)
            {
            columnElement += `<tr>
              <td>${userFromRequest.id}</td>
              <td>${userFromRequest.firstName}</td>
              <td>${userFromRequest.lastName}</td>
              <td>${userFromRequest.age}</td>
              <td>${userFromRequest.username}</td>
              <td>${userFromRequest.role.map(role => role.name.substring(5))}</td>
            </tr>
           `
                columnElement2 += `
        ${userFromRequest.role.map(role => role.name.substring(5))}
           `
            }
        })
        tableOneUser.innerHTML = columnElement
        currentUserRoles.innerHTML = columnElement2
    })




