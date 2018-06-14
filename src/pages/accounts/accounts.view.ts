import {DAO} from "./../../dao/DAO";
import {Account} from "./../../model/Account";
declare const hx: any;

export class AccountsView{

    table: any;
    webFinanceDAO: DAO<Account>;

    public async init(): Promise<void> {
        try {
            this.webFinanceDAO = new DAO("http://localhost:8080/accounts", Account.base());
            this.table = new hx.DataTable('#table');
            new hx.Form('#form')
                .addText('Name', { required: true })
                .addSubmit('Submit', 'fa fa-check')
                .on('submit', (data) => {this.saveAccount(data)})
            this.showAccounts();
        }
        catch(err) {
            hx.notify.warning(err.toString());
            return;
        }
    }
    
    private async showAccounts(): Promise<void> {
        try {
            let accounts: Account[] = await this.webFinanceDAO.getAll();
    
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
            return;
        }
    }

    private async saveAccount(data: object): Promise<void> {
        try {
            let account: Account = Account.base().of(data["Name"]);
            await this.webFinanceDAO.post(account);
            await this.showAccounts();
        }
        catch (err) {
            hx.notify.warning(err.toString());
            return;
        }
    }

}

