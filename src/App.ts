import {getAccounts} from "./dao/AccountsDAO";
const hx = require("./resources/hexagon/hexagon.js");

async function run(): Promise<void> {
    try {
        let json = await getAccounts();
        //document.body.innerHTML = JSON.stringify(json);
        var table = new hx.DataTable('#accounts');
        table.feed(hx.dataTable.objectFeed({
        headers: [
            {name: 'Name', id: 'name'},
            {name: 'Age', id: 'age'},
            {name: 'Profession', id: 'profession'}
        ],
        rows: [
            {
            id: 0, // hidden details can go here (not in the cells object)
            cells: {'name': 'Bob', 'age': 25, 'profession': 'Developer'}
            },
            {
            id: 1,
            cells: {'name': 'Jan', 'age': 41, 'profession': 'Artist'}
            },
            {
            id: 2,
            cells: {'name': 'Dan', 'age': 41, 'profession': 'Builder'}
            }
        ]
        }));
    }
    catch(err) {
        console.error(err);
    }
}

run();