import {DAO} from "../dao/DAO";
import {Account} from "./../model/Account";
import {Form} from "./Form";
declare const hx;

export class AccountForm extends Form<Account> {

    constructor(accountDAO: DAO<Account>, refresh: () => void) {
        super(accountDAO, refresh);
    }

    public init(): void {
        new hx.Form('#account_form')
            .addText('Name', { required: true })
            .addSubmit('Submit', 'fa fa-check')
            .on('submit', (data) => {this.save(data)})
    }
    
    createFromFormData(formData: object): Account {
        return Account.base().of(formData["Name"]);
    }

}

