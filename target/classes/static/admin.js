const tableUser = document.getElementById('tableAllUsers')
const tableOneUser = document.getElementById('tableOneUser')
const currentUserLogin = document.getElementById('currentUserLogin')
const currentUserRoles = document.getElementById('currentUserRoles')


const url = 'http://localhost:8080/users/'
const urlRoles = 'http://localhost:8080/users/roles'


// роль сверху
fillCurrentUserRole()

function fillCurrentUserRole() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let columnElement = ''
            data.forEach(userFromRequest => {
                if (userFromRequest.username === currentUserLogin.innerText)
                    columnElement += `
        ${userFromRequest.role.map(role => role.name.substring(5))}
           `
            })
            currentUserRoles.innerHTML = columnElement
        })
}


// Таблица всех пользователей
fillUsersTable()

function fillUsersTable() {
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
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" id="buttonEdit"
                    data-index="${userFromRequest.id}" data-bs-target="#modalEdit">
                    Edit
                    </button>
                    </td>
                    <td>
                    <button type="button" class="btn btn-danger delete" id="buttonDelete"
                    data-index="${userFromRequest.id}" data-bs-target="#modalDelete" data-bs-toggle="modal">
                    Delete
                    </button>
                    </td>
                    <td>
                    </td>
            </tr>
           `
            })
            tableUser.innerHTML = columnElement
        })
}

// Заполнение авторизованного пользователя
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


// modal EDIT
$('#modalEdit').off().on('show.bs.modal', event => {
    let id = $(event.relatedTarget).attr("data-index")
    fillUserForm(id, document.forms['editUserModalForm'], 'Patch')
    document.getElementById('updateUser').addEventListener('click', (event) => {
        editCurrentUser(id)
    })

})
// modal DELETE
$('#modalDelete').off().on('show.bs.modal', event => {
    let id = $(event.relatedTarget).attr("data-index")
    fillUserForm(id, document.forms['modalDeleteForm'], 'Delete')
    document.getElementById('deleteUser').addEventListener('click', (event) => {
        deleteCurrentUser(id)
    })

})

// tab NEW USER
$('.nav-tabs a[href="#newUser"]').on('show.bs.tab', () => {
    getRoles()
    document.getElementById('newUserButton2').addEventListener('click', newUser)
})

// Все роли
function getRoles() {
    const rolesNew = document.getElementById('rolesNew')
    fetch(urlRoles)
        .then(response => response.json())
        .then(data => {
            let resRoles = ''
            data.forEach(element => {
                if (element.id === 2) {
                    resRoles +=
                        `
                    <option value='${element.id}' selected>
                    ${element.name.substring(5)}
                    </option>
                    `
                } else if (element.id === 1) {
                    resRoles +=
                        `
                    <option value='${element.id}' >
                    ${element.name.substring(5)}
                    </option>
                    `
                }
            })
            rolesNew.innerHTML = resRoles
        })
}

// Заполнение форм modal EDIT, DELETE
function fillUserForm(id, form, method) {
    fetch(url + id)
        .then(response => response.json())
        .then(data => {
            form.id.value = data.id
            form.firstName.value = data.firstName
            form.lastName.value = data.lastName
            form.username.value = data.username
            form.age.value = data.age
            form.password.value = data.password
            userSelectRole(data.role)
            console.log(data.role)

            function userSelectRole(role) {

                fetch(urlRoles)
                    .then(response => response.json())
                    .then(data => {
                        let rolesToEdit = document.getElementById('roles' + method)
                        let count = 0
                        let count2 = 0
                        let columnElement = ''
                        data.forEach(element => {
                            let roleCurrent = role.map(role => role.name)
                            if (roleCurrent.includes(element.name) && count <= 0) {
                                count++
                                columnElement +=
                                    `
                    <option value='${element.id}' selected>
                    ${element.name.substring(5)}
                    </option>
                    `
                            } else if (!roleCurrent.includes(element.name) && count2 <=0) {
                                count2++
                                columnElement +=
                                    `
                    <option value='${element.id}' >
                    ${element.name.substring(5)}
                    </option>
                    `
                            }
                        })
                        rolesToEdit.innerHTML = columnElement
                    })
            }

        })
}

// Кнопка DELETE
function deleteCurrentUser(id) {
    fetch(url + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        fillUsersTable()
        document.getElementById('closeDeleteModal').click()
        $('.nav-tabs a[href="#table"]').tab('show')
    })
}

// Кнопка EDIT
function editCurrentUser(id) {
    let userEditForm = document.forms['editUserModalForm']
    console.log(userEditForm.roles)
    let editUserRoles = []
    for (let option of document.getElementById('rolesPatch').options) {
        if (option.selected) {
            editUserRoles.push({
                id: option.value,
                name: 'ROLE_' + option.innerText
            })
        }
    }
    fetch(url + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: userEditForm.id.value,
            firstName: userEditForm.firstName.value,
            lastName: userEditForm.lastName.value,
            username: userEditForm.username.value,
            age: userEditForm.age.value,
            password: userEditForm.password.value,
            roles: editUserRoles
        })
    }).then((response) => {
        fillUsersTable()
        document.getElementById('closeEditModalWindow').click()
        $('.nav-tabs a[href="#table"]').tab('show')
    })
}


// Заполнение формы нового пользователя
function newUser(e) {
    e.preventDefault()
    const formNewUser = document.forms['formNewUser']
    let newUserRoles = []
    for (let option of document.getElementById('rolesNew').options) {
        if (option.selected) {
            newUserRoles.push({
                name: 'ROLE_' + option.innerText
            })
        }
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: formNewUser.username.value,
            age: formNewUser.age.value,
            password: formNewUser.password.value,
            firstName: formNewUser.firstName.value,
            lastName: formNewUser.lastName.value,
            roles: newUserRoles
        })
    }).then((response) => {
            if (response.ok) {
                formNewUser.reset()
                fillUsersTable()
                $('.nav-tabs a[href="#table"]').tab('show')
            } else {
                getErrorMessage({
                    "message": "Error. Enter valid data"
                }, formNewUser)
            }
        }
    )

}

//получение окна сообщения с ошибками
function getErrorMessage(errorJSON, form) {
    let errorBody = document.getElementById('errorBody')
    let errorBodyText = ''
    for (let line of errorJSON.message.split(';')) {
        errorBodyText +=
            `
             <a>${line}</a>
             <br>
             `
    }
    //console.log(errorJSON.message)
    errorBody.innerHTML = errorBodyText
    form.password.value = ''
    $('#errorModal').modal('toggle')
}