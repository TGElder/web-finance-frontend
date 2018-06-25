import { expect } from 'chai';
import 'mocha';
import { Commitment } from './Commitment';
import { Account } from './Account';

it('should be able to create a commitment from JSON with closure', (done) => {
    let commitment: Commitment = Commitment.base().fromObject({
        "id": 123,
        "from": { "id": 1, "name": "Personal" },
        "to": { "id": 2, "name": "Savings" },
        "what": "Rainy Day",
        "amount": 4567,
        "epochSecond": 1000,
        "closure": {
            "id": 456,
            "epochSecond": 1001
        }
    });

    expect(commitment.getId()).to.equal(123);
    expect(commitment.getFrom().getId()).to.equal(1);
    expect(commitment.getFrom().getName()).to.equal("Personal");
    expect(commitment.getTo().getId()).to.equal(2);
    expect(commitment.getTo().getName()).to.equal("Savings");
    expect(commitment.getWhat()).to.equal("Rainy Day");
    expect(commitment.getAmount()).to.equal(4567);
    expect(commitment.getTimestamp().getTime()).to.equal(1000000);
    expect(commitment.getClosed().getTime()).to.equal(1001000);
    done();
});

it('should be able to create a commitment from JSON with no closure', (done) => {
    let commitment: Commitment = Commitment.base().fromObject({
        "id": 123,
        "from": { "id": 1, "name": "Personal" },
        "to": { "id": 2, "name": "Savings" },
        "what": "Rainy Day",
        "amount": 4567,
        "epochSecond": 1000
    });

    expect(commitment.getId()).to.equal(123);
    expect(commitment.getFrom().getId()).to.equal(1);
    expect(commitment.getFrom().getName()).to.equal("Personal");
    expect(commitment.getTo().getId()).to.equal(2);
    expect(commitment.getTo().getName()).to.equal("Savings");
    expect(commitment.getWhat()).to.equal("Rainy Day");
    expect(commitment.getAmount()).to.equal(4567);
    expect(commitment.getTimestamp().getTime()).to.equal(1000000);
    expect(commitment.getClosed()).to.equal(null);
    done();
});

it('should be able to create an commitment from parameters', (done) => {
    let commitment: Commitment = Commitment.base().of(
        Account.base().fromObject({"id": 1, "name": "Personal"}),
        Account.base().fromObject({"id": 2, "name": "Savings"}),
        "Rainy Day",
        4567,
        new Date(1000000)
    )
    expect(commitment.getId()).to.equal(null);
    expect(commitment.getFrom().getId()).to.equal(1);
    expect(commitment.getFrom().getName()).to.equal("Personal");
    expect(commitment.getTo().getId()).to.equal(2);
    expect(commitment.getTo().getName()).to.equal("Savings");
    expect(commitment.getWhat()).to.equal("Rainy Day");
    expect(commitment.getAmount()).to.equal(4567);
    expect(commitment.getTimestamp().getTime()).to.equal(1000000);
    expect(commitment.getClosed()).to.equal(null);
    done();
});

it('should be able to create post object from account', (done) => {
    let commitment: Commitment = Commitment.base().fromObject({
        "id": 123,
        "from": { "id": 1, "name": "Personal" },
        "to": { "id": 2, "name": "Savings" },
        "what": "Rainy Day",
        "amount": 4567,
        "epochSecond": 1000,
        "closure": {
            "id": 456,
            "epochSecond": 1001
        }
    });

    let post: object = commitment.toPostObject();
    expect(post).to.deep.equal({
        "from": { "id": 1 },
        "to": { "id": 2 },
        "what": "Rainy Day",
        "amount": 4567,
        "epochSecond": 1000
    });
    done();
});