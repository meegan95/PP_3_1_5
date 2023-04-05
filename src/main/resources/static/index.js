let tableAll = document.getElementById('tbodyAllUserTable')


 function fillTable(textContent, content) {
    textContent.textContent = content
 }

const url = 'http://localhost:8080/users'
fetch(url)
    .then(response => response.json())
    .then(data => {
            console.log(data)
            data.forEach(userFromData => {
                    let filledTable = ` 
                <tr> 
                <td>${userFromData.id}</td>
                <td>${userFromData.firstName}</td>
                <td>${userFromData.lastName}</td>
                <td>${userFromData.age}</td>
                <td>${userFromData.username}</td>
                <td>${userFromData.role}</td>
                </tr>`;
                tableAll.append(filledTable)

                })
        })
    .catch(error => console.error(error))

