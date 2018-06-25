import { DAO } from "./../../dao/DAO";
import { Account } from "./../../model/Account";
import { Transfer } from "./../../model/Transfer";
import { AccountView } from "./account.view";
import { Commitment } from "../../model/Commitment";
declare const hx: any;

let view: AccountView = new AccountView();
view.init(
    new DAO("http://localhost:8080/accounts", Account.base()),
    new DAO("http://localhost:8080/transfers", Transfer.base()),
    new DAO("http://localhost:8080/commitments", Commitment.base())
);