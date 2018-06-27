import { expect } from 'chai';
import 'mocha';
import { Commitment } from './../model/Commitment'
import { CommitmentTable } from './CommitmentTable'

it('should be able to create a row from a commitment', (done) => {
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

    let commitmentTable: CommitmentTable = new CommitmentTable(null, null, {});

    let row: object = commitmentTable.createRowFromObject(commitment);

    expect(row).to.deep.equals({
        "id": 123,
        "commitment": commitment,
        "cells": {
            "from": "Personal",
            "to": "Savings",
            "what": "Rainy Day",
            "amount": 45.67,
            "timestamp": new Date(1000000).toLocaleString(),
            "closed": new Date(1001000).toLocaleString()
        }
    });
    
    done();
});