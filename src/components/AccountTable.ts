import {DAO} from "../dao/DAO";
import {Account} from "./../model/Account";
declare const hx: any;

export class AccountTable{

    private table: any;
    private accountDAO: DAO<Account>;

    constructor(accountDAO: DAO<Account>) {
        this.accountDAO = accountDAO;
        this.init();
    }

    private async init(): Promise<void> {
        try {
            this.table = new hx.DataTable('#account_table');
            this.refresh();
        }
        catch(err) {
            hx.notify.warning(err.toString());
            console.log(err);
            return;
        }
    }
    
    public async refresh(): Promise<void> {
        try {
            let accounts: Account[] = await this.accountDAO.getAll();
    
            let tableRows = [];
            console.log(accounts);
            for (let account of accounts) {
                let tableRow = {id: account.getId(), cells: {account: account.getName()}};
                tableRows.push(tableRow);
            }
    
            let tableContents = {
                headers: [
                    {name: 'Account', id: 'account'}
                ],
                rows: tableRows
            }
                        
            this.table.feed(hx.dataTable.objectFeed(tableContents));
        }
        catch(err) {
            hx.notify.warning(err.toString());
            console.log(err);
            return;
        }
    }

}

