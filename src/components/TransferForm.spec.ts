import { expect } from 'chai';
import 'mocha';
import { Account } from './../model/Account'
import { Transfer } from './../model/Transfer'
import { TransferForm } from './TransferForm'

it('should be able to create a transfer from form data', (done) => {

    let accounts: Account[] = [
        Account.base().fromObject({"id": 1, "name": "Personal"}),
        Account.base().fromObject({"id": 2, "name": "Savings"})
    ];

    let data: object = {
        "From": "1: Personal",
        "To": "2: Savings",
        "What": "Rainy Day",
        "Pounds": "45",
        "Pence": "67",
        "When": new Date(1000000)
    };


    let transfer: Transfer = new TransferForm(accounts, null, null).createFromFormData(data);
    expect(transfer.getId()).to.equal(null);
    expect(transfer.getFrom().getId()).to.equal(1);
    expect(transfer.getFrom().getName()).to.equal("Personal");
    expect(transfer.getTo().getId()).to.equal(2);
    expect(transfer.getTo().getName()).to.equal("Savings");
    expect(transfer.getWhat()).to.equal("Rainy Day");
    expect(transfer.getAmount()).to.equal(4567);
    expect(transfer.getTimestamp().getTime()).to.equal(1000000);
    done();
});