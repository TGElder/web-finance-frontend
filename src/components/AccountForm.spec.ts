import { expect } from 'chai';
import 'mocha';
import { Account } from './../model/Account'
import { AccountForm } from './AccountForm'

it('should be able to create an account from form data', (done) => {
    let data: object = {"Name": "Personal"};
    let account: Account = new AccountForm(null, null).createFromFormData(data);
    expect(account.getId()).to.equal(null);
    expect(account.getName()).to.equal("Personal");
    done();
});