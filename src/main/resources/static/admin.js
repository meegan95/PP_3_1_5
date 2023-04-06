const tableUser = document.getElementById('tableAllUsers')
const tableOneUser = document.getElementById('tableOneUser')
const modalEditButton = document.getElementById('modalEditButton')
const modalDeleteButton = document.getElementById('modalDeleteButton')
const newUserButton = document.getElementById('newUserButton')
const currentUserLogin = document.getElementById('currentUserLogin')

const url = 'http://localhost:8080/users'
const urlForOne = 'http://localhost:8080/users/1'
const urlDelete = 'http://localhost:8080/users/1'

// $('#tableUser').empty()
// Таблица всех пользователей
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
            console.log(columnElement)
        })
        tableUser.innerHTML = columnElement
    })
// .catch(error => console.error(error))

// заполнение авторизованного юзера
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
            console.log(columnElement)
        })
        tableOneUser.innerHTML = columnElement
    })

// Модеальное окно EDIT
fetch(urlForOne)
    .then(response => response.json())
    .then(user => {
        let columnElement =


            `
        
                   <input type="hidden" value="${user.id}" name="id">

                    <p class="h6">First name</p>
                   <input type="text" class=" mb-2 form-control" required
                        name="firstName"
                       value="${user.firstName}">

                    <p class="h6">Last name</p>
                    <input type="text" class="  mb-2 form-control" required
                          name="lastName"
                        value="${user.lastName}">

                           <p class="h6">Age</p>
                   <input type="number" class="mb-2 form-control" required
                   name="age"
                    value="${user.age}">

                    <p class="h6 ">Email</p>
                     <input type="email" class=" mb-2 form-control" required
                     name="username"
                     value="${user.username}">

                     <p class="h6 ">Password</p>
                     <input type="password" class=" mb-2 form-control"
                     required
                     name="password"
                     value="${user.password}">

                     <select id="editUserRoles" class="form-select" required
                      name="roles" multiple size="2">
                      <option
                      value="${user.role.map(role => role.id)}"
                      th:text="${user.role.map(role => role.name.substring(5))}" selected>
                     </option>

                     </select>
           `


        console.log(columnElement)
        modalEditButton.innerHTML = columnElement
    })


fetch(urlForOne)
    .then(response => response.json())
    .then(user => {
        let columnElement = `
        
                   <input type="hidden" value="${user.id}" name="id">

                    <p class="h6">First name</p>
                   <input type="text" class=" mb-2 form-control" required
                        name="firstName"
                       value="${user.firstName}">

                    <p class="h6">Last name</p>
                    <input type="text" class="  mb-2 form-control" required
                          name="lastName"
                        value="${user.lastName}">

                           <p class="h6">Age</p>
                   <input type="number" class="mb-2 form-control" required
                   name="age"
                    value="${user.age}">

                    <p class="h6 ">Email</p>
                     <input type="email" class=" mb-2 form-control" required
                     name="username"
                     value="${user.username}">

                     <p class="h6 ">Password</p>
                     <input type="password" class=" mb-2 form-control"
                     required
                     name="password"
                     value="${user.password}">

                     <select id="editUserRoles" class="form-select" required
                      name="roles" multiple size="2">
                      <option
                      value="${user.role.map(role => role.id)}"
                      th:text="${user.role.map(role => role.name.substring(5))}" selected>
                     </option>

                     </select>
           `
        console.log(columnElement)
        modalDeleteButton.innerHTML = columnElement
    })


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