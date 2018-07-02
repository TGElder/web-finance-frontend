import { expect } from 'chai';
import 'mocha';
import { Balance } from './Balance'

it('should calculate total transfer', (done) => {
    let balance: Balance = new Balance(0, 25, 75, 0, 0);
    expect(balance.getTransferTotal()).to.equal(-50);
    done();
});

it('should calculate total commitment', (done) => {
    let balance: Balance = new Balance(0, 0, 0, 75, 25);
    expect(balance.getCommitmentsTotal()).to.equal(50);
    done();
});

it('should calculate total', (done) => {
    let balance: Balance = new Balance(100, 16, 32, 75, 25);
    expect(balance.getTotal()).to.equal(134);
    done();
});
