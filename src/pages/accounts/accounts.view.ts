import {getAccounts, addAccount} from "./../../dao/AccountsDAO";
import {WebFinanceAccount} from "./../../model/WebFinanceAccount";
declare const hx: any;

export class AccountsView{

    table: any;

    public async init(): Promise<void> {
        try {
            this.table = new hx.DataTable('#table');
            new hx.Form('#form')
                .addText('Name', { required: true })
                .addSubmit('Submit', 'fa fa-check')
                .on('submit', (data) => {this.saveAccount(data)})
            this.showAccounts();
        }
        catch(err) {
            console.log(err);
        }
    }
    
    private async showAccounts(): Promise<void> {
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
            }
                        
            this.table.feed(hx.dataTable.objectFeed(tableContents));
        }
        catch(err) {
            console.error(err);
        }
    }

    private async saveAccount(data: JSON): Promise<void> {
        try {
            await addAccount(data["Name"]);
            await this.showAccounts();
        }
        catch (err) {
            console.error(err);
        }
    }

}

