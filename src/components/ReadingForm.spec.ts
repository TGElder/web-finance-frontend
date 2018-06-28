import { expect } from 'chai';
import 'mocha';
import { Account } from './../model/Account'
import { Reading } from './../model/Reading'
import { ReadingForm } from './ReadingForm'

it('should be able to create a reading from form data', (done) => {

    let account: Account = Account.base().fromObject({"id": 1, "name": "Personal"});
        
    let data: object = {
        "Account": "1: Personal",
        "Pounds": "1",
        "Pence": "1",
        "When": new Date(1000000)
    };


    let reading: Reading = new ReadingForm(account, null, null).createFromFormData(data);
    expect(reading.getId()).to.equal(null);
    expect(reading.getAccount().getId()).to.equal(1);
    expect(reading.getAccount().getName()).to.equal("Personal");
    expect(reading.getAmount()).to.equal(101);
    expect(reading.getWhen().getTime()).to.equal(1000000);
    done();
});