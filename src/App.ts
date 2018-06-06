import {getAccounts} from "./dao/AccountsDAO";
import {WebFinanceAccount} from "./model/WebFinanceAccount";
declare const hx: any;

async function run(): Promise<void> {
    try {
        let accounts: WebFinanceAccount[] = await getAccounts();

        let tableRows = [];
        for (let account of accounts) {
            let tableRow = {id: account.getId(), cells: {account: account.getName()}};
            tableRows.push(tableRow);
        }

        let tableContents = {
            headers: [
                {name: 'Account', id: 'account'}
            ],
            rows: tableRows
        };
                    
        let table = new hx.DataTable('#accounts');
        table.feed(hx.dataTable.objectFeed(tableContents));
    }
    catch(err) {
        console.error(err);
    }
}

run();