import { Account } from "./Account";
import { Entity } from "./Entity";

export class Transfer implements Entity<Transfer> {
    private id: number;
    private from: Account;
    private to: Account;
    private what: string;
    private amount: number;
    private timestamp: Date;

    private static INSTANCE: Transfer = new Transfer();

    getId(): number {
        return this.id;
    }

    getFrom(): Account {
        return this.from;
    }
    
    getTo(): Account {
        return this.to;
    }

    getWhat(): string {
        return this.what;
    }

    getAmount(): number {
        return this.amount;
    }

    getTimestamp(): Date {
        return this.timestamp;
    }

    static base(): Transfer {
        return Transfer.INSTANCE;
    }

    of(from: Account, to: Account, what: string, amount: number, timestamp: Date) {
        let out: Transfer = new Transfer();
        out.id = null;
        out.from = from;
        out.to = to;
        out.what = what;
        out.amount = amount;
        out.timestamp = timestamp;
        return out;
    }

    fromObject(json: object): Transfer {
        let out: Transfer = new Transfer();
        out.id = json["id"];
        out.from = Account.base().fromObject(json["from"]);
        out.to = Account.base().fromObject(json["to"]);
        out.what = json["what"];
        out.amount = json["amount"];
        out.timestamp = new Date(json["epochSecond"] * 1000);
        return out;
    }

    toPostObject(): object {
        return {
            "from": {"id": this.from.getId()},
            "to": {"id": this.to.getId()},
            "what": this.getWhat(),
            "amount": this.getAmount(),
            "epochSecond": this.getTimestamp().getTime() / 1000
        };
    }
}