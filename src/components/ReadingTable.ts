import {Table} from "./Table"
import {DAO} from "../dao/DAO";
import {Reading} from "./../model/Reading";
declare const hx: any;

export class ReadingTable extends Table<Reading> {

    constructor(readingDAO: DAO<Reading>, parameters: object) {
        super("#reading_table", readingDAO, parameters);
    }

    getOptions(): object {
        return {};
    }

    getHeaders(): object[] {
        return [
            {name: 'Amount', id: 'amount'},
            {name: 'When', id: 'when'}
        ];
    }

    createRowFromObject(reading: Reading): object {
        return {
            id: reading.getId(), cells: {
            amount: reading.getAmount() / 100,
            when: reading.getWhen().toLocaleString()
        }};
    }

}

