import { DAO } from "./../../dao/DAO";
import { Account } from "./../../model/Account";
import { AccountForm } from "../../components/AccountForm";
import { AccountTable } from "../../components/AccountTable";
declare const hx: any;

export class AccountsView{

    private accountTable: AccountTable;

    constructor(accountDAO: DAO<Account>) {
        this.accountTable = new AccountTable(accountDAO);
        new AccountForm(accountDAO, this.refresh.bind(this));
    }

    public async refresh(): Promise<void> {
        this.accountTable.refresh();
    }
    
}

