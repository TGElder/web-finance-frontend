import { Entity } from "./Entity";
import { Balance } from "./Balance";

export class Account implements Entity<Account> {
    private id: number;
    private name: string;
    private balance: Balance;
    private static INSTANCE: Account = new Account();

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getBalance(): Balance {
        return this.balance;
    }
    
    static base(): Account {
        return Account.INSTANCE;
    }

    of(name: string, balance: Balance) {
        let out: Account = new Account();
        out.id = null;
        out.name = name;
        out.balance = balance;
        return out;
    }

    fromObject(json: object): Account {
        let out: Account = new Account();
        out.id = json["id"];
        out.name = json["name"];
        if (json["balance"]) {
            out.balance = new Balance(
                json["balance"]["lastReading"],
                json["balance"]["transfersIn"],
                json["balance"]["transfersOut"],
                json["balance"]["commitmentsIn"],
                json["balance"]["commitmentsOut"]
            );
        } else {
            out.balance = null;
        }
        return out;
    }

    toPostObject(): object {
        return {"name": this.name};
    }

    toString(): string {
        return this.name;
    }
}