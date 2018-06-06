import {getAccounts} from "./dao/AccountsDAO";
import {WebFinanceAccount} from "./model/WebFinanceAccount";
declare const hx: any;

async function run(): Promise<void> {
    try {
        let json: any = await getAccounts();

        let tableRows = [];
        for (let entity of json) {
            console.log(entity);
            let tableRow = {id: entity["id"], cells: {account: entity["name"]}};
            console.log(tableRow);
            tableRows.push(tableRow);
        }

        let tableContents = {
            headers: [
                {name: 'Account', id: 'account'}
            ],
            rows: tableRows
        };
                    
        //document.body.innerHTML = JSON.stringify(json);
        let table = new hx.DataTable('#accounts');
        table.feed(hx.dataTable.objectFeed(tableContents));
    }
    catch(err) {
        console.error(err);
    }
}

run();