import { Entity } from "./Entity";
import { Account } from "./Account";

export class Reading implements Entity<Reading> {
    private id: number;
    private account: Account;
    private amount: number;
    private when: Date;
    
    private static INSTANCE: Reading = new Reading();

    getId(): number {
        return this.id;
    }

    getAccount(): Account {
        return this.account;
    }

    getAmount(): number {
        return this.amount;
    }

    getWhen(): Date {
        return this.when;
    }
    
    static base(): Reading {
        return Reading.INSTANCE;
    }

    of(account: Account, amount: number, when: Date) {
        let out: Reading = new Reading();
        out.id = null;
        out.account = account;
        out.amount = amount;
        out.when = when;        
        return out;
    }

    fromObject(json: object): Reading {
        let out: Reading = this.of(
            Account.base().fromObject(json["account"]), 
            json["amount"], 
            new Date(json["epochSecond"] * 1000));
        out.id = json["id"];
        return out;
    }

    toPostObject(): object {
        return {
            "account": {"id": this.account.getId()},
            "amount": this.amount,
            "epochSecond": this.getWhen().getTime() / 1000
        };
    }

}