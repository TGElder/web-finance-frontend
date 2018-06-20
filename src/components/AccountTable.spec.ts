import { expect } from 'chai';
import 'mocha';
import { Account } from './../model/Account'
import { AccountTable } from './AccountTable'

it('should be able to create a row from object', (done) => {
    let account: Account = Account.base().fromObject({
        "id": 1,
        "name": "Personal"
    });

    let accountTable: AccountTable = new AccountTable(null);

    let row: object = accountTable.createRowFromObject(account);

    expect(row).to.deep.equals({
        "id": 1,
        "cells": {"account": "Personal"}
    });
    
    done();
});