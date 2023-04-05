const tableUser = document.getElementById('tableAllUsers')
const tableOneUser = document.getElementById('tableOneUser')
const modalEditButton = document.getElementById('modalEditButton')

const url = 'http://localhost:8080/users'
const urlForOne = 'http://localhost:8080/users/1'

// $('#tableUser').empty()
fetch(url)
    .then(response => response.json())
    .then(data => {
        let columnElement = ''
        data.forEach(userFromRequest => {
            columnElement += `<tr>
              <td>${userFromRequest.id}</td>
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


fetch(urlForOne)
    .then(response => response.json())
    .then(data => {
        let columnElement = `<tr>
              <td>${data.id}</td>
              <td>${data.firstName}</td>
              <td>${data.lastName}</td>
              <td>${data.age}</td>
              <td>${data.username}</td>
              <td>${data.role.map(role => role.name.substring(5))}</td>
            </tr>
           `
        console.log(columnElement)
        tableOneUser.innerHTML = columnElement
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
        modalEditButton.innerHTML = columnElement
    })

