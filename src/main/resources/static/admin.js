const tableUser = document.getElementById('tableAllUsers')
const tableOneUser = document.getElementById('tableOneUser')
const modalDeleteButton = document.getElementById('modalDeleteButton')
const newUserButton = document.getElementById('newUserButton')
const currentUserLogin = document.getElementById('currentUserLogin')

const url = 'http://localhost:8080/users/'
const urlRoles = 'http://localhost:8080/users/roles'
const urlForOne = 'http://localhost:8080/users/1'



// Таблица всех пользователей // работает
fetch(url)
    .then(response => response.json())
    .then(data => {
        let columnElement = ''
        data.forEach(userFromRequest => {
            columnElement += `<tr>
              <td id="user${userFromRequest.id}">${userFromRequest.id}</td>
              <td>${userFromRequest.firstName}</td>
              <td>${userFromRequest.lastName}</td>
              <td>${userFromRequest.age}</td>
              <td>${userFromRequest.username}</td>
              <td>${userFromRequest.role.map(role => role.name.substring(5))}</td>
              <td>
                    <button type="button" class="btn btn-danger delete" id="buttonDelete"
                    data-index="${userFromRequest.id}" data-bs-target="#modalDelete" data-bs-toggle="modal">
                    Delete
                    </button>
                    </td>
                    <td>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" id="buttonEdit"
                    data-index="${userFromRequest.id}" data-bs-target="#modalEdit">
                    Edit
                    </button>
                    </td>
                    <td>
                    </td>
            </tr>
           `
        })
        tableUser.innerHTML = columnElement
    })
// .catch(error => console.error(error))

// заполнение авторизованного юзера //работает
fillUsersTable()
function fillUsersTable() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let columnElement = ''
            data.forEach(userFromRequest => {
                if (userFromRequest.username === currentUserLogin.innerText)
                    columnElement += `<tr>
              <td>${userFromRequest.id}</td>
              <td>${userFromRequest.firstName}</td>
              <td>${userFromRequest.lastName}</td>
              <td>${userFromRequest.age}</td>
              <td>${userFromRequest.username}</td>
              <td>${userFromRequest.role.map(role => role.name.substring(5))}</td>
            </tr>
           `
            })
            tableOneUser.innerHTML = columnElement
        })
}

// modal EDIT - заполняется
$('#modalEdit').off().on('show.bs.modal', event => {
    let id = $(event.relatedTarget).attr("data-index")
    fillUserForm(id, document.forms['editUserModalForm'], 'Patch')
    document.getElementById('updateUser').addEventListener('click',null)

})
// modal DELETE - заполняется
$('#modalDelete').off().on('show.bs.modal', event => {
    let id = $(event.relatedTarget).attr("data-index")
    fillUserForm(id, document.forms['modalDeleteForm'], 'Delete')
    document.getElementById('deleteUser').addEventListener('click',(event) => {
        deleteCurrentUser(id)
    })

})

// заполнение форм modal EDIT, DELETE
function fillUserForm(id ,form , method) {
    fetch(url + id)
        .then(response => response.json())
        .then(data => {
            form.id.value = data.id
            form.firstName.value = data.firstName
            form.lastName.value = data.lastName
            form.username.value = data.username
            form.age.value = data.age
            userSelectRole(data.role)
            function userSelectRole(role) {

                // TODO Роли - выделить текущую
                fetch(urlRoles)
                    .then(response => response.json())
                    .then(data => {
                        let rolesToEdit = document.getElementById('roles' + method)
                        let columnElement = ''
                        data.forEach(element => {
                                columnElement += `
                                <option value='${element.id}'>
                    ${element.name.substring(5)}
                    </option> `
                        })
                        rolesToEdit.innerHTML = columnElement
                    })
            }

        })
}
// кнопка DELETE - не работает
function deleteCurrentUser(id) {
    fetch(url + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        // fillUsersTable()
        document.getElementById('closeDeleteModal').click()
        // getSuccessMessage('User has been deleted!')
        fillUsersTable()
        $('.nav-tabs a[href="#table"]').tab('show')
    })
}



// Новый пользователь - некорректно
fetch(urlForOne)
    .then(response => response.json())
    .then(user => {
        let columnElement = `
                     <p>
                            <label class="container-fluid col-6" for="firstName">
                                <strong>First Name</strong>
                                <input class="form-control" type="text"
                                       name="firstName" id="firstName"
                                       placeholder="First name"
                                       value="${user.firstName}">
                            </label>
                        </p>

                        <p>
                            <label class="container-fluid col-6" for="lastName">
                                <strong>Last Name</strong>
                                <input class="form-control" type="text"
                                       name="name" id="lastName"
                                       placeholder="Last name"
                                       value="${user.lastName}">
                            </label>
                        </p>

                        <p>
                            <label class="container-fluid col-6" for="age">
                                <strong>Age</strong>
                                <input class="form-control" type="text"
                                       name="name" id="age"
                                       placeholder="Age"
                                       value="${user.age}">
                            </label>
                        </p>

                        <p>
                            <label class="container-fluid col-6" for="username">
                                <strong>Email</strong>
                                <input class="form-control" type="email"
                                       name="username" id="username"
                                       placeholder="Email"
                                       value="${user.username}">
                            </label>
                        </p>

                        <p>
                            <label class="container-fluid col-6" for="password">
                                <strong>Password</strong>
                                <input class="form-control password" type="password"
                                       name="password" id="password"
                                       placeholder="Password"
                                       value="${user.password}">
                            </label>
                        </p>

                        <label class="container-fluid col-6"
                               for="my_roles">
                            <strong>Role</strong>
                            <select id="my_roles" class="form-select"
                                    name="roles" multiple size="2">
                            </select>
                        </label>
                        <p>
                            <button type="submit" id="newUserButton" class="btn btn-success">Add new user
                            </button>
                        </p>
           `
        console.log(columnElement)
        newUserButton.innerHTML = columnElement
    })




// function deleteUser() {
//     fetch(urlDelete, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
// }