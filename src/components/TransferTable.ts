import {Table} from "./Table"
import {DAO} from "../dao/DAO";
import {Transfer} from "./../model/Transfer";
declare const hx: any;

export class TransferTable extends Table<Transfer> {

    constructor(transferDAO: DAO<Transfer>, parameters: object) {
        super("#transfer_table", transferDAO, parameters);
    }

    getOptions(): object {
        return {};
    }

    getHeaders(): object[] {
        return [
            {name: 'From', id: 'from'},
            {name: 'To', id: 'to'},
            {name: 'What', id: 'what'},
            {name: 'Amount', id: 'amount'},
            {name: 'When', id: 'timestamp'}
        ];
    }

    createRowFromObject(transfer: Transfer): object {
        return {
            id: transfer.getId(), cells: {
            from: transfer.getFrom().getName(),
            to: transfer.getTo().getName(),
            what: transfer.getWhat(),
            amount: transfer.getAmount() / 100,
            timestamp: transfer.getTimestamp().toLocaleString()
        }};
    }

}

