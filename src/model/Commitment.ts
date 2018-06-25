import { Account } from "./Account";
import { Entity } from "./Entity";

export class Commitment implements Entity<Commitment> {
    private id: number;
    private from: Account;
    private to: Account;
    private what: string;
    private amount: number;
    private timestamp: Date;
    private closed: Date;

    private static INSTANCE: Commitment = new Commitment();

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

    getClosed(): Date {
        return this.closed;
    }

    static base(): Commitment {
        return Commitment.INSTANCE;
    }

    of(from: Account, to: Account, what: string, amount: number, created: Date) {
        let out: Commitment = new Commitment();
        out.id = null;
        out.from = from;
        out.to = to;
        out.what = what;
        out.amount = amount;
        out.timestamp = created;
        out.closed = null;
        return out;
    }

    fromObject(json: object): Commitment {
        let out: Commitment = new Commitment();
        out.id = json["id"];
        out.from = Account.base().fromObject(json["from"]);
        out.to = Account.base().fromObject(json["to"]);
        out.what = json["what"];
        out.amount = json["amount"];
        out.timestamp = new Date(json["epochSecond"] * 1000);
        let closure: object = json["closure"];
        if (closure) {
            out.closed = new Date(json["closure"]["epochSecond"] * 1000);
        } else {
            out.closed = null;
        }
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