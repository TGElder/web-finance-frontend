import { DAO } from "./../../dao/DAO";
import { Account } from "./../../model/Account";
import { Reading } from "./../../model/Reading";
import { ReadingTable } from "../../components/ReadingTable";
import { ReadingForm } from "../../components/ReadingForm";
import { Transfer } from "./../../model/Transfer";
import { TransferForm } from "../../components/TransferForm";
import { TransferTable } from "../../components/TransferTable";
import { Commitment } from "./../../model/Commitment";
import { CommitmentClosure } from "./../../model/CommitmentClosure";
import { CommitmentForm } from "../../components/CommitmentForm";
import { CommitmentTable } from "../../components/CommitmentTable";
declare const hx: any;

export class AccountView{

    private readingTable: ReadingTable;
    private transferTable: TransferTable;
    private commitmentTable: CommitmentTable;

    async init(
        accountsDAO: DAO<Account>,
        readingDAO: DAO<Reading>,
        transferDAO: DAO<Transfer>,
        commitmentDAO: DAO<Commitment>,
        commitmentClosureDAO: DAO<CommitmentClosure>
    ) {
        let urlSearchParams: URLSearchParams = new URL(window.location.href).searchParams;
        
        let transferParams: object = {};
        let commitmentParams: object = {};

        if (urlSearchParams.has("closed")) {
            commitmentParams["closed"] = urlSearchParams.get("closed");
        }

        if (urlSearchParams.has("account")) {

            let accountId: number = parseInt(urlSearchParams.get("account"));
            transferParams["account"] = accountId;
            commitmentParams["account"] = accountId;

            let accounts: Account[] = await accountsDAO.getAll({});
            let account: Account = await accountsDAO.get(accountId);

            this.readingTable = new ReadingTable(readingDAO, {});
            let readingForm = new ReadingForm(account, readingDAO, this.refresh.bind(this));
            this.transferTable = new TransferTable(transferDAO, transferParams);
            let transferForm = new TransferForm(accounts, transferDAO, this.refresh.bind(this));
            this.commitmentTable = new CommitmentTable(commitmentDAO, commitmentClosureDAO, commitmentParams);
            let commitmentForm = new CommitmentForm(accounts, commitmentDAO, this.refresh.bind(this));

            readingForm.init();
            transferForm.init();
            commitmentForm.init();
            this.readingTable.init();
            this.transferTable.init();
            this.commitmentTable.init();
        }

       
    }

    public async refresh(): Promise<void> {
        this.readingTable.refresh();
        this.transferTable.refresh();
        this.commitmentTable.refresh();
    }
    
}

