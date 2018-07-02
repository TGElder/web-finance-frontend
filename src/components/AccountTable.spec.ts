import { expect } from 'chai';
import 'mocha';
import { Account } from './../model/Account'
import { AccountTable } from './AccountTable'

it('should be able to create a row from an account', (done) => {
    let account: Account = Account.base().fromObject({
        "id": 1,
        "name": "Personal",
        "balance": {
            "lastReading": 1000,
            "transfersIn": 200,
            "transfersOut": 300,
            "commitmentsIn": 400,
            "commitmentsOut": 500
        }
    });

    let accountTable: AccountTable = new AccountTable(null);

    let row: object = accountTable.createRowFromObject(account);

    expect(row).to.deep.equals({
        "id": 1,
        "cells": {
            "account": "Personal",
            "lastReading": 10.00,
            "transfers": -1.00,
            "commitments": -1.00,
            "balance": 8.00
        }
    });
    
    done();
});