let columnId = document.getElementById('columnId')
let columnFirstName = document.getElementById('columnFirstName')
let columnLastName = document.getElementById('columnLastName')
let columnAge = document.getElementById('columnAge')
let columnUsername = document.getElementById('columnUsername')
let columnRole = document.getElementById('columnRole')



//     "role": [
//     {
//         "id": 1,
//         "name": "ROLE_ADMIN",
//         "authority": "ROLE_ADMIN",
//         "roleName": "ADMIN "
//     }
// ]

 function fillTable(textContent, content) {
    textContent.textContent = content
 }


const url = 'http://localhost:8080/users'
fetch(url)
    .then(response => response.json())
    .then(data => {
            console.log(data)
            data.forEach(userFromRequest => {
                fillTable(columnId,userFromRequest.id)
                fillTable(columnFirstName,userFromRequest.firstName)
                fillTable(columnLastName,userFromRequest.lastName)
                fillTable(columnAge,userFromRequest.age)
                fillTable(columnUsername,userFromRequest.username)
                fillTable(columnRole,userFromRequest.role.map(role => role.name.substring(5)))
                })
        })
    .catch(error => console.error(error))

