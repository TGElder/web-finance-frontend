import { expect } from 'chai';
import 'mocha';
import { Transfer } from './../model/Transfer'
import { TransferTable } from './TransferTable'

it('should be able to create a row from a transfer', (done) => {
    let transfer: Transfer = Transfer.base().fromObject({
        "id": 123,
        "from": { "id": 1, "name": "Personal" },
        "to": { "id": 2, "name": "Savings" },
        "what": "Rainy Day",
        "amount": 4567,
        "epochSecond": 1000
    });

    let transferTable: TransferTable = new TransferTable(null, {});

    let row: object = transferTable.createRowFromObject(transfer);

    expect(row).to.deep.equals({
        "id": 123,
        "cells": {
            "from": "Personal",
            "to": "Savings",
            "what": "Rainy Day",
            "amount": 45.67,
            "timestamp": new Date(1000000).toLocaleString()
        }
    });
    
    done();
});