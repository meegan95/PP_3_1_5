
const tableOneUser = document.getElementById('tableOneUser')
const currentUserLogin = document.getElementById('currentUserLogin')

const url = 'http://localhost:8080/users'


// $('#tableUser').empty()
// fetch(urlForOne)
//     .then(response => response.json())
//     .then(data => {
//         let columnElement = `<tr>
//               <td>${data.id}</td>
//               <td>${data.firstName}</td>
//               <td>${data.lastName}</td>
//               <td>${data.age}</td>
//               <td>${data.username}</td>
//               <td>${data.role.map(role => role.name.substring(5))}</td>
//             </tr>
//            `
//         console.log(columnElement)
//         tableOneUser.innerHTML = columnElement
//     })


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