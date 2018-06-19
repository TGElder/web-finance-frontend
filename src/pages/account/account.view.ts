import { DAO } from "./../../dao/DAO";
import { Account } from "./../../model/Account";
import { Transfer } from "./../../model/Transfer";
import { TransferForm } from "../../components/TransferForm";
import { TransferTable } from "../../components/TransferTable";
declare const hx: any;

export class AccountView{

    private transferTable: TransferTable;

    constructor(accountsDAO: DAO<Account>, transferDAO: DAO<Transfer>, ) {
        this.transferTable = new TransferTable(transferDAO);
        new TransferForm(accountsDAO, transferDAO, this.refresh.bind(this));
    }

    public async refresh(): Promise<void> {
        this.transferTable.refresh();
    }
    
}

