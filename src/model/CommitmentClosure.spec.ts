import { expect } from 'chai';
import 'mocha';
import { Commitment } from './Commitment';
import { CommitmentClosure } from './CommitmentClosure';
import { Account } from './Account';

const testCommitment: Commitment = Commitment.base().fromObject({
    "id": 123,
    "from": { "id": 1, "name": "Personal" },
    "to": { "id": 2, "name": "Savings" },
    "what": "Rainy Day",
    "amount": 4567,
    "epochSecond": 1000
});

it('should be able to create a commitment closure from parameters', (done) => {
    let commitmentClosure: CommitmentClosure = CommitmentClosure.base().of(
        testCommitment,
        new Date(1000000)
    )
    expect(commitmentClosure.getCommitment().getId()).to.equal(123);
    expect(commitmentClosure.getClosed().getTime()).to.equal(1000000);
    done();
});

it('should be able to create post object from account', (done) => {
    let commitmentClosure: CommitmentClosure = CommitmentClosure.base().of(
        testCommitment,
        new Date(1000000)
    )

    let post: object = commitmentClosure.toPostObject();
    expect(post).to.deep.equal({
        "commitment": { "id": 123 },
        "epochSecond": 1000
    });
    done();
});