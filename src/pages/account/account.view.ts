import { DAO } from "./../../dao/DAO";
import { Account } from "./../../model/Account";
import { Transfer } from "./../../model/Transfer";
import { TransferForm } from "../../components/TransferForm";
import { TransferTable } from "../../components/TransferTable";
import { Commitment } from "./../../model/Commitment";
import { CommitmentClosure } from "./../../model/CommitmentClosure";
import { CommitmentForm } from "../../components/CommitmentForm";
import { CommitmentTable } from "../../components/CommitmentTable";
declare const hx: any;

export class AccountView{

    private transferTable: TransferTable;
    private commitmentTable: CommitmentTable;

    async init(
        accountsDAO: DAO<Account>,
        transferDAO: DAO<Transfer>,
        commitmentDAO: DAO<Commitment>,
        commitmentClosureDAO: DAO<CommitmentClosure>
    ) {
        let url: URL = new URL(window.location.href);
        let urlSearchParams: URLSearchParams = new URL(window.location.href).searchParams;
        
        let transferParams: object = {};
        let commitmentParams: object = {};

        if (urlSearchParams.has("account")) {
            transferParams["account"] = urlSearchParams.get("account");
            commitmentParams["account"] = urlSearchParams.get("account");
        }

        if (urlSearchParams.has("closed")) {
            commitmentParams["closed"] = urlSearchParams.get("closed");
        }

        this.transferTable = new TransferTable(transferDAO, transferParams);
        this.transferTable.init();
        let transferForm = new TransferForm(await accountsDAO.getAll({}), transferDAO, this.refresh.bind(this));
        transferForm.init();
        this.commitmentTable = new CommitmentTable(commitmentDAO, commitmentClosureDAO, commitmentParams);
        this.commitmentTable.init();
        let commitmentForm = new CommitmentForm(await accountsDAO.getAll({}), commitmentDAO, this.refresh.bind(this));
        commitmentForm.init();
    }

    public async refresh(): Promise<void> {
        this.transferTable.refresh();
        this.commitmentTable.refresh();
    }
    
}

