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
    private readingForm: ReadingForm;
    private transferForm: TransferForm;
    private commitmentForm: CommitmentForm;

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

            document.title = account.getName();

            this.readingTable = new ReadingTable(readingDAO, {});
            this.readingForm = new ReadingForm(account, readingDAO, this.refresh.bind(this));
            this.transferTable = new TransferTable(transferDAO, transferParams);
            this.transferForm = new TransferForm(accounts, transferDAO, this.refresh.bind(this));
            this.commitmentTable = new CommitmentTable(commitmentDAO, commitmentClosureDAO, commitmentParams);
            this.commitmentForm = new CommitmentForm(accounts, commitmentDAO, this.refresh.bind(this));

            hx.select("#account_header").text(account.getName());

            this.readingForm.init();
            this.transferForm.init();
            this.commitmentForm.init();
            this.readingTable.init();
            this.transferTable.init();
            this.commitmentTable.init();

            new hx.Collapsible('#reading_collapsible')
            new hx.Collapsible('#transfer_collapsible')
            new hx.Collapsible('#commitment_collapsible')
        }

       
    }

    public async refresh(): Promise<void> {
        this.readingTable.refresh();
        this.transferTable.refresh();
        this.commitmentTable.refresh();
    }
    
}

