import {Table} from "./Table"
import {DAO} from "../dao/DAO";
import {Commitment} from "./../model/Commitment";
declare const hx: any;

export class CommitmentTable extends Table<Commitment> {

    constructor(commitmentDAO: DAO<Commitment>,  parameters: object) {
        super("#commitment_table", commitmentDAO, parameters);
    }

    getHeaders(): object[] {
        return [
            {name: 'From', id: 'from'},
            {name: 'To', id: 'to'},
            {name: 'What', id: 'what'},
            {name: 'Amount', id: 'amount'},
            {name: 'When', id: 'timestamp'},
            {name: 'Closed', id: 'closed'}
        ];
    }

    createRowFromObject(commitment: Commitment): object {
        return {
            id: commitment.getId(), cells: {
            from: commitment.getFrom().getName(),
            to: commitment.getTo().getName(),
            what: commitment.getWhat(),
            amount: commitment.getAmount(),
            timestamp: commitment.getTimestamp(),
            closed: commitment.getClosed()
        }};
    }

}

