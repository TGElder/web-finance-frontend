import { DAO } from "./../../dao/DAO";
import { Account } from "./../../model/Account";
import { Transfer } from "./../../model/Transfer";
import { TransferForm } from "../../components/TransferForm";
import { TransferTable } from "../../components/TransferTable";
declare const hx: any;

export class AccountView{

    private transferTable: TransferTable;

    async init(accountsDAO: DAO<Account>, transferDAO: DAO<Transfer>) {
        this.transferTable = new TransferTable(transferDAO);
        this.transferTable.init();
        let transferForm = new TransferForm(await accountsDAO.getAll(), transferDAO, this.refresh.bind(this));
        transferForm.init();
    }

    public async refresh(): Promise<void> {
        this.transferTable.refresh();
    }
    
}

