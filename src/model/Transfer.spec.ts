import { expect } from 'chai';
import 'mocha';
import { Transfer } from './Transfer';
import { Account } from './Account';

it('should be able to create a transfer from JSON', (done) => {
    let transfer: Transfer = Transfer.base().fromObject({
        "id": 123,
        "from": { "id": 1, "name": "Personal" },
        "to": { "id": 2, "name": "Savings" },
        "what": "Rainy Day",
        "amount": 4567,
        "epochSecond": 1000
    });

    expect(transfer.getId()).to.equal(123);
    expect(transfer.getFrom().getId()).to.equal(1);
    expect(transfer.getFrom().getName()).to.equal("Personal");
    expect(transfer.getTo().getId()).to.equal(2);
    expect(transfer.getTo().getName()).to.equal("Savings");
    expect(transfer.getWhat()).to.equal("Rainy Day");
    expect(transfer.getAmount()).to.equal(4567);
    expect(transfer.getTimestamp().getTime()).to.equal(1000000);
    done();
});

it('should be able to create an transfer from parameters', (done) => {
    let transfer: Transfer = Transfer.base().of(
        Account.base().fromObject({"id": 1, "name": "Personal"}),
        Account.base().fromObject({"id": 2, "name": "Savings"}),
        "Rainy Day",
        4567,
        new Date(1000000)
    )
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

it('should be able to create post object from account', (done) => {
    let transfer: Transfer = Transfer.base().fromObject({
        "id": 123,
        "from": { "id": 1, "name": "Personal" },
        "to": { "id": 2, "name": "Savings" },
        "what": "Rainy Day",
        "amount": 4567,
        "epochSecond": 1000
    });

    let post: object = transfer.toPostObject();
    expect(post).to.deep.equal({
        "from": { "id": 1 },
        "to": { "id": 2 },
        "what": "Rainy Day",
        "amount": 4567,
        "epochSecond": 1000
    });
    done();
});