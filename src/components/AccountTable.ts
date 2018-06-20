import {Table} from "./Table"
import {DAO} from "../dao/DAO";
import {Account} from "./../model/Account";
declare const hx: any;

export class AccountTable extends Table<Account> {

    constructor(accountDAO: DAO<Account>) {
        super("#account_table", accountDAO);
    }

    getHeaders(): object[] {
        return [
            {name: 'Account', id: 'account'}
        ];
    }

    createRowFromObject(account: Account): object {
        return {
            id: account.getId(), 
            cells: {
                account: account.getName()
            }
        };
    }

}

