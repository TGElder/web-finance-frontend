import { expect } from 'chai';
import 'mocha';
import { Account } from './Account';
import { Reading } from './Reading';

it('should be able to create a reading from JSON', (done) => {
    let reading: Reading = Reading.base().fromObject({
        "id": 123,
        "account": {"id": 456, "name": "Personal"},
        "amount": 808,
        "epochSecond": 1000
    });
    expect(reading.getId()).to.equal(123);
    expect(reading.getAccount().getId()).to.equal(456);
    expect(reading.getAccount().getName()).to.equal("Personal");
    expect(reading.getAmount()).to.equal(808);
    expect(reading.getWhen().getTime()).to.equal(1000000);
    done();
});

it('should be able to create a reading from parameters', (done) => {
    let reading: Reading = Reading.base().of(
        Account.base().fromObject({"id": 456, "name": "Personal"}),
        808,
        new Date(1000000)
    );
    expect(reading.getId()).to.equal(null);
    expect(reading.getAccount().getId()).to.equal(456);
    expect(reading.getAccount().getName()).to.equal("Personal");
    expect(reading.getAmount()).to.equal(808);
    expect(reading.getWhen().getTime()).to.equal(1000000);
    done();
});

it('should be able to create post object from reading', (done) => {
    let reading: Reading = Reading.base().of(
        Account.base().fromObject({"id": 456, "name": "Personal"}),
        808,
        new Date(1000000)
    );
    let post: object = reading.toPostObject();
    expect(post).to.deep.equal({
        "account": {"id": 456},
        "amount": 808,
        "epochSecond": 1000
    });
    done();
});