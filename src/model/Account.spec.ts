import { expect } from 'chai';
import 'mocha';
import { Account } from './Account'

it('should be able to create an account from JSON', (done) => {
    let account: Account = Account.base().fromObject({"id": 123, "name": "Personal"});
    expect(account.getId()).to.equal(123);
    expect(account.getName()).to.equal("Personal");
    done();
});

it('should be able to create an account from parameters', (done) => {
    let account: Account = Account.base().of("Personal");
    expect(account.getId()).to.equal(null);
    expect(account.getName()).to.equal("Personal");
    done();
});

it('should be able to create post object from account', (done) => {
    let post: object = Account.base().of("Personal").toPostObject();
    expect(post).to.deep.equal({"name": "Personal"});
    done();
});