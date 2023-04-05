let columnId = document.getElementById('columnId')
let columnFirstName = document.getElementById('columnFirstName')
let columnLastName = document.getElementById('columnLastName')
let columnAge = document.getElementById('columnAge')
let columnUsername = document.getElementById('columnUsername')
let columnRole = document.getElementById('columnRole')

// <td id="columnId" th:text="id"></td>
// <td id="columnFirstName" th:text="firstName"></td>
// <td id="columnLastName" th:text="lastName"></td>
// <td id="columnAge" th:text="age"></td>
// <td id="columnUsername" th:text="username"></td>
// <td id="columnRole"

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
                fillTable(columnRole,userFromRequest.role)
                })
        })
    .catch(error => console.error(error))

