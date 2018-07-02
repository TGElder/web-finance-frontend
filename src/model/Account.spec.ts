import { expect } from 'chai';
import 'mocha';
import { Account } from './Account'
import { Balance } from './Balance';

it('should be able to create an account from JSON with balance', (done) => {
    let account: Account = Account.base().fromObject({
        "id": 123, 
        "name": "Personal",
        "balance": {
            "lastReading": 1000,
            "transfersIn": 200,
            "transfersOut": 300,
            "commitmentsIn": 400,
            "commitmentsOut": 500
        }
    });
    expect(account.getId()).to.equal(123);
    expect(account.getName()).to.equal("Personal");
    expect(account.getBalance().getLastReading()).to.equal(1000);
    expect(account.getBalance().getTransfersIn()).to.equal(200);
    expect(account.getBalance().getTransfersOut()).to.equal(300);
    expect(account.getBalance().getCommitmentsIn()).to.equal(400);
    expect(account.getBalance().getCommitmentsOut()).to.equal(500);
    done();
});

it('should be able to create an account from JSON without balance', (done) => {
    let account: Account = Account.base().fromObject({
        "id": 123, 
        "name": "Personal"
    });
    expect(account.getId()).to.equal(123);
    expect(account.getName()).to.equal("Personal");
    expect(account.getBalance()).to.equal(null);
    done();
});

it('should be able to create an account from parameters', (done) => {
    let balance: Balance = new Balance(1, 2, 3, 4, 5);
    let account: Account = Account.base().of("Personal", balance);
    expect(account.getId()).to.equal(null);
    expect(account.getName()).to.equal("Personal");
    expect(account.getBalance()).to.equal(balance);
    done();
});

it('should be able to create post object from account', (done) => {
    let post: object = Account.base().of("Personal", null).toPostObject();
    expect(post).to.deep.equal({"name": "Personal"});
    done();
});