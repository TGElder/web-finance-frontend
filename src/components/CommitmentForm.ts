import {Form} from './Form'
import {DAO} from "./../dao/DAO";
import {Account} from "./../model/Account";
import {Commitment} from "./../model/Commitment";
declare const hx: any;

export class CommitmentForm extends Form<Commitment> {

    private accounts: Map<string, Account>;

    constructor(accounts: Account[], commitmentDAO: DAO<Commitment>, refresh: () => void) {
        super(commitmentDAO, refresh);
        this.accounts = new Map<string, Account> ();
        for (let account of accounts) {
            this.accounts.set(account.getId() + ": " + account.getName(), account);
        }
    }

    getAccounts(): Map<string, Account> {
        return this.accounts;
    }

    public async init(): Promise<void> {
        try {
            let account_names: string[] = Array.from(this.accounts.keys());
            new hx.Form('#commitment_form')
                .addPicker("From", account_names, { required: true })
                .addPicker("To", account_names, { required: true })
                .addText('What', { required: true, placeholder: 'What is this commitment for?' })
                .addNumber('Pounds', {required: true})
                .addNumber('Pence', {required: true})
                .addDateTimePicker('When', { required: true })
                .addSubmit('Submit', 'fa fa-check')
                .on('submit', (data) => {this.save(data)})
        }
        catch(err) {
            hx.notify.warning(err.toString());
            console.log(err);
            return;
        }
    }

    createFromFormData(formData: object): Commitment {
        return Commitment.base().of(
            this.accounts.get(formData["From"]),
            this.accounts.get(formData["To"]),
            formData["What"],
            parseInt(formData["Pounds"]) * 100 + parseInt(formData["Pence"]),
            formData["When"]
        );
    }

}

