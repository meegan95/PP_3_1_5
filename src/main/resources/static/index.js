const tableUser = document.getElementById('tableAllUsers')
const tableOneUser = document.getElementById('tableOneUser')


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

