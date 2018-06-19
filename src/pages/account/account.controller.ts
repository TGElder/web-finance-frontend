import { DAO } from "./../../dao/DAO";
import { Account } from "./../../model/Account";
import { Transfer } from "./../../model/Transfer";
import { AccountView } from "./account.view";
declare const hx: any;

let view: AccountView = new AccountView(
    new DAO("http://localhost:8080/accounts", Account.base()),
    new DAO("http://localhost:8080/transfers", Transfer.base())
);