import {DAO} from "./../../dao/DAO";
import {Account} from "./../../model/Account";
import {Transfer} from "./../../model/Transfer";
declare const hx: any;

export class AccountView{

    transfer_table: any;
    accounts: Map<string, Account>;
    accountDAO: DAO<Account>;
    transferDAO: DAO<Transfer>;

    public async init(): Promise<void> {
        try {
            this.accountDAO = new DAO("http://localhost:8080/accounts", Account.base());
            this.transferDAO = new DAO("http://localhost:8080/transfers", Transfer.base());
            this.accounts = new Map<string, Account> ();
            for (let account of await this.accountDAO.getAll()) {
                this.accounts.set(account.getId() + ": " + account.getName(), account);
            }
            let account_names: string[] = Array.from(this.accounts.keys());
            this.transfer_table = new hx.DataTable('#transfer_table');
            new hx.Form('#transfer_form')
                .addPicker("From", account_names, { required: true })
                .addPicker("To", account_names, { required: true })
                .addText('What', { required: true, placeholder: 'What is this transfer for?' })
                .addNumber('Pounds', {required: true})
                .addNumber('Pence', {required: true})
                .addDateTimePicker('When', { required: true })
                .addSubmit('Submit', 'fa fa-check')
                .on('submit', (data) => {this.saveAccount(data)})
            this.showTransfers();
        }
        catch(err) {
            hx.notify.warning(err.toString());
            console.log(err);
            return;
        }
    }
    
    private async showTransfers(): Promise<void> {
        try {
            let transfers: Transfer[] = await this.transferDAO.getAll();
            let tableRows = [];
            for (let transfer of transfers) {
                let tableRow = {id: transfer.getId(), cells: {
                    from: transfer.getFrom().getName(),
                    to: transfer.getTo().getName(),
                    what: transfer.getWhat(),
                    amount: transfer.getAmount(),
                    timestamp: transfer.getTimestamp()
                }};
                tableRows.push(tableRow);
            }
    
            let tableContents = {
                headers: [
                    {name: 'From', id: 'from'},
                    {name: 'To', id: 'to'},
                    {name: 'What', id: 'what'},
                    {name: 'Amount', id: 'amount'},
                    {name: 'When', id: 'timestamp'}
                ],
                rows: tableRows
            }
                        
            this.transfer_table.feed(hx.dataTable.objectFeed(tableContents));
        }
        catch(err) {
            hx.notify.warning(err.toString());
            console.log(err);
            return;
        }
    }

    private async saveAccount(data: object): Promise<void> {
        try {
            console.log(data);
            let transfer: Transfer = Transfer.base().of(
                this.accounts.get(data["From"]),
                this.accounts.get(data["To"]),
                data["What"],
                data["Pounds"] * 100 + data["Pence"],
                data["When"]
            );
            await this.transferDAO.post(transfer);
            await this.showTransfers();
        }
        catch (err) {
            hx.notify.warning(err.toString());
            console.log(err);
            return;
        }
    }

}

