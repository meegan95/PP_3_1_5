let columnId = document.getElementById('columnId')
let columnFirstName = document.getElementById('columnFirstName')

function fillTable(node){
    node.textContent = '1'
}


fillTable(columnId)


const url = 'http://localhost:8080/users'
fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))

