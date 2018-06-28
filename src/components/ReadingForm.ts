import {Form} from './Form'
import {DAO} from "./../dao/DAO";
import {Account} from "./../model/Account";
import {Reading} from "./../model/Reading";
declare const hx: any;

export class ReadingForm extends Form<Reading> {

    private account: Account;

    constructor(account: Account, readingDAO: DAO<Reading>, refresh: () => void) {
        super(readingDAO, refresh);
        this.account = account;
    }

    getAccount(): Account {
        return this.account;
    }

    public async init(): Promise<void> {
        try {
            new hx.Form('#reading_form')
                .addNumber('Pounds', {required: true, min: 0})
                .addNumber('Pence', {required: true, placeholder: 0, min: 0, max: 99})
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

    createFromFormData(formData: object): Reading {
        return Reading.base().of(
            this.account,
            parseInt(formData["Pounds"]) * 100 + parseInt(formData["Pence"]),
            formData["When"]
        );
    }

}

