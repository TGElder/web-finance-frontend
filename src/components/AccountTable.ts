import {Table} from "./Table"
import {DAO} from "../dao/DAO";
import {Account} from "./../model/Account";
declare const hx: any;

export class AccountTable extends Table<Account> {

    constructor(accountDAO: DAO<Account>) {
        super("#account_table", accountDAO, {});
    }

    getOptions(): object {
        return {columns: {
            account: {
                cellRenderer: (element, cell, row) => {
                    hx.select(element).add(hx.detached('a').attr('href', 'account.html?account=' + row.id).text(cell))
                }
            }
        }
        };
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

