import { expect } from 'chai';
import 'mocha';
import { Account } from './../model/Account'
import { Commitment } from './../model/Commitment'
import { CommitmentForm } from './CommitmentForm'

it('should be able to create a commitment from form data', (done) => {

    let accounts: Account[] = [
        Account.base().fromObject({"id": 1, "name": "Personal"}),
        Account.base().fromObject({"id": 2, "name": "Savings"})
    ];

    let data: object = {
        "From": "1: Personal",
        "To": "2: Savings",
        "What": "Rainy Day",
        "Pounds": "1",
        "Pence": "1",
        "When": new Date(1000000)
    };


    let commitment: Commitment = new CommitmentForm(accounts, null, null).createFromFormData(data);
    expect(commitment.getId()).to.equal(null);
    expect(commitment.getFrom().getId()).to.equal(1);
    expect(commitment.getFrom().getName()).to.equal("Personal");
    expect(commitment.getTo().getId()).to.equal(2);
    expect(commitment.getTo().getName()).to.equal("Savings");
    expect(commitment.getWhat()).to.equal("Rainy Day");
    expect(commitment.getAmount()).to.equal(101);
    expect(commitment.getTimestamp().getTime()).to.equal(1000000);
    expect(commitment.getClosed()).to.equal(null);
    done();
});