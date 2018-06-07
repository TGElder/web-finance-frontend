import {getAccounts} from "./../../dao/AccountsDAO";
import {WebFinanceAccount} from "./../../model/WebFinanceAccount";
declare const hx: any;

export class AccountsView{

    public async init(): Promise<void> {
        try {
            new hx.Form('#form')
                .addText('Name', { required: true });
            hx.select('#button').on('click', function(){
                hx.notify.info('Button clicked');
                });                
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
            };
                        
            let table = new hx.DataTable('#table');
            table.feed(hx.dataTable.objectFeed(tableContents));
        }
        catch(err) {
            console.error(err);
        }
    }

}

