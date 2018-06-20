import { Entity } from '../model/Entity'
import { DAO } from '../dao/DAO'
declare const hx: any;

export abstract class Table<T extends Entity<T>> {

    private element: string;
    private table: any;
    private tableDAO: DAO<T>;

    constructor(element: string, tableDAO: DAO<T>) {
        this.element = element;
        this.tableDAO = tableDAO;
    }
    
    public async init(): Promise<void> {
        try {
            this.table = new hx.DataTable(this.element);
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
            let entities: T[] = await this.tableDAO.getAll();
    
            let tableRows = [];
            for (let entity of entities) {
                let tableRow: object = this.createRowFromObject(entity);
                tableRows.push(tableRow);
            }
    
            let tableContents = {
                headers: this.getHeaders(),
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

    abstract getHeaders(): object[];

    abstract createRowFromObject(object: T): object;


}
