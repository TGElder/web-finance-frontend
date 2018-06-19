import {DAO} from "../dao/DAO";
import {Account} from "./../model/Account";
declare const hx: any;

export class AccountForm{

    private table: any;
    private accountDAO: DAO<Account>;
    private refresh: () => void;

    constructor(accountDAO: DAO<Account>, refresh: () => void) {
        this.accountDAO = accountDAO;
        this.refresh = refresh;
        this.init();
    }

    private init(): void {
        new hx.Form('#account_form')
            .addText('Name', { required: true })
            .addSubmit('Submit', 'fa fa-check')
            .on('submit', (data) => {this.saveAccount(data)})
    }
    
    private async saveAccount(data: object): Promise<void> {
        try {
            let account: Account = Account.base().of(data["Name"]);
            await this.accountDAO.post(account);
            await this.refresh();
        }
        catch (err) {
            hx.notify.warning(err.toString());
            console.log(err);
            return;
        }
    }

}

