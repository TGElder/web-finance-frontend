import {Table} from "./Table"
import {DAO} from "../dao/DAO";
import {Commitment} from "./../model/Commitment";
import {CommitmentClosure} from "./../model/CommitmentClosure";
declare const hx: any;

export class CommitmentTable extends Table<Commitment> {

    private commitmentClosureDAO: DAO<CommitmentClosure>;

    constructor(
        commitmentDAO: DAO<Commitment>,  
        commitmentClosureDAO: DAO<CommitmentClosure>, 
        parameters: object
    ) {
        super("#commitment_table", commitmentDAO, parameters);
        this.commitmentClosureDAO = commitmentClosureDAO;
    }

    getOptions(): object {
        return {columns: {
             closed: {
                cellRenderer: (element, cell, row) => {
                    if (cell) {
                        hx.select(element).text(cell);
                    } else {
                        hx.select(element).add(hx
                            .button({context: 'positive'})
                            .text('Close'))
                            .on('click', () => this.closeCommitment(row.commitment));
                    }
                }
            }
        }
        };
    }

    private async closeCommitment(commitment: Commitment): Promise<void> {
        await this.commitmentClosureDAO.post(
            CommitmentClosure.base().of(
                commitment,
                new Date()
            )
        );
        this.refresh();
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
            id: commitment.getId(), 
            commitment: commitment,
            cells: {
            from: commitment.getFrom().getName(),
            to: commitment.getTo().getName(),
            what: commitment.getWhat(),
            amount: commitment.getAmount() / 100,
            timestamp: commitment.getTimestamp().toLocaleString(),
            closed: commitment.getClosed().toLocaleString()
        }};
    }

}

