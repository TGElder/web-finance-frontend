import { expect } from 'chai';
import 'mocha';
import { getAccounts } from './AccountsDAO';

it('should get the list of accounts', (done) => {
    getAccounts().then( (accounts) => {
        expect(accounts).to.deep.equal([
            {
                "id": 1,
                "name": "Savings"
            },
            {
                "id": 2,
                "name": "Personal"
            }
        ]);
    }).then(done).catch(err => done(err));
});
