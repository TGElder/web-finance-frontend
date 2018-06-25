import { DAO } from "./../../dao/DAO";
import { Account } from "./../../model/Account";
import { Transfer } from "./../../model/Transfer";
import { TransferForm } from "../../components/TransferForm";
import { TransferTable } from "../../components/TransferTable";
import { Commitment } from "./../../model/Commitment";
import { CommitmentForm } from "../../components/CommitmentForm";
import { CommitmentTable } from "../../components/CommitmentTable";
declare const hx: any;

export class AccountView{

    private transferTable: TransferTable;
    private commitmentTable: CommitmentTable;

    async init(accountsDAO: DAO<Account>, transferDAO: DAO<Transfer>, commitmentDAO: DAO<Commitment>) {
        this.transferTable = new TransferTable(transferDAO);
        this.transferTable.init();
        let transferForm = new TransferForm(await accountsDAO.getAll({}), transferDAO, this.refresh.bind(this));
        transferForm.init();
        this.commitmentTable = new CommitmentTable(commitmentDAO);
        this.commitmentTable.init();
        let commitmentForm = new CommitmentForm(await accountsDAO.getAll({}), commitmentDAO, this.refresh.bind(this));
        commitmentForm.init();
    }

    public async refresh(): Promise<void> {
        this.transferTable.refresh();
        this.commitmentTable.refresh();
    }
    
}

