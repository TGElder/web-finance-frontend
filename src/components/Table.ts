import { Entity } from '../model/Entity'
import { DAO } from '../dao/DAO'
declare const hx: any;

export abstract class Table<T extends Entity<T>> {

    private element: string;
    private table: any;
    private tableDAO: DAO<T>;
    private parameters: object;

    constructor(element: string, tableDAO: DAO<T>, parameters: object) {
        this.element = element;
        this.tableDAO = tableDAO;
        this.parameters = parameters;
    }
    
    public async init(): Promise<void> {
        try {
            this.table = new hx.DataTable(this.element, this.getOptions());
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
            let entities: T[] = await this.tableDAO.getAll(this.parameters);
    
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

    abstract getOptions(): object;

    abstract getHeaders(): object[];

    abstract createRowFromObject(object: T): object;


}
