var itemsTable = document.getElementById('items-table');
var itemsTableBody = itemsTable.getElementsByTagName('tbody')[0];

function getItems() {
    fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((res) => res.json())
    .then((data) => {
        var itemRows = '';
        data.items.items.forEach(item => {
            itemRows += '<tr>'+
                '<th scope="row" class="thumbnail"><img src="'+item.img+'"/></th>'+
                '<td class="name">'+item.name+'</td>'+
                '<td class="type">'+item.type+'</td>'+
                '<td class="price">'+item.price+'</td>'+
                '</tr>';
        });

        itemsTableBody.innerHTML = itemRows;
    });
}