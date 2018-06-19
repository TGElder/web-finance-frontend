import {DAO} from "../dao/DAO";
import {Transfer} from "./../model/Transfer";
declare const hx: any;

export class TransferTable{

    private table: any;
    private transferDAO: DAO<Transfer>;

    constructor(transferDAO: DAO<Transfer>) {
        this.transferDAO = transferDAO;
        this.init();
    }

    private async init(): Promise<void> {
        try {
            this.table = new hx.DataTable('#transfer_table');
            this.refresh();
        }
        catch(err) {
            hx.notify.warning(err.toString());
            console.log(err);
            return;
        }
    }
    
    public async refresh(): Promise<void> {
        try {
            let transfers: Transfer[] = await this.transferDAO.getAll();
            let tableRows = [];
            for (let transfer of transfers) {
                let tableRow = {id: transfer.getId(), cells: {
                    from: transfer.getFrom().getName(),
                    to: transfer.getTo().getName(),
                    what: transfer.getWhat(),
                    amount: transfer.getAmount(),
                    timestamp: transfer.getTimestamp()
                }};
                tableRows.push(tableRow);
            }
    
            let tableContents = {
                headers: [
                    {name: 'From', id: 'from'},
                    {name: 'To', id: 'to'},
                    {name: 'What', id: 'what'},
                    {name: 'Amount', id: 'amount'},
                    {name: 'When', id: 'timestamp'}
                ],
                rows: tableRows
            }
                        
            this.table.feed(hx.dataTable.objectFeed(tableContents));
        }
        catch(err) {
            hx.notify.warning(err.toString());
            console.log(err);
            return;
        }
    }

}

