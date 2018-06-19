import {DAO} from "./../dao/DAO";
import {Account} from "./../model/Account";
import {Transfer} from "./../model/Transfer";
declare const hx: any;

export class TransferForm {

    private accounts: Map<string, Account>;
    private accountDAO: DAO<Account>;
    private transferDAO: DAO<Transfer>;
    private refresh: () => void;

    constructor(accountDAO: DAO<Account>, transferDAO: DAO<Transfer>, refresh: () => void) {
        this.accountDAO = accountDAO;
        this.transferDAO = transferDAO;
        this.refresh = refresh;
        this.init();
    }

    private async init(): Promise<void> {
        try {
            this.accounts = new Map<string, Account> ();
            for (let account of await this.accountDAO.getAll()) {
                this.accounts.set(account.getId() + ": " + account.getName(), account);
            }
            let account_names: string[] = Array.from(this.accounts.keys());
            new hx.Form('#transfer_form')
                .addPicker("From", account_names, { required: true })
                .addPicker("To", account_names, { required: true })
                .addText('What', { required: true, placeholder: 'What is this transfer for?' })
                .addNumber('Pounds', {required: true})
                .addNumber('Pence', {required: true})
                .addDateTimePicker('When', { required: true })
                .addSubmit('Submit', 'fa fa-check')
                .on('submit', (data) => {this.saveAccount(data)})
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
            await this.refresh();
        }
        catch (err) {
            hx.notify.warning(err.toString());
            console.log(err);
            return;
        }
    }

}

