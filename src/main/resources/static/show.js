
const tableOneUser = document.getElementById('tableOneUser')


const urlForOne = 'http://localhost:8080/users/1'


// $('#tableUser').empty()
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
