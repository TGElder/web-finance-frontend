import { Entity } from "./Entity";

export class Account implements Entity<Account> {
    private id: number;
    private name: string;
    private static INSTANCE: Account = new Account();

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }
    
    static base(): Account {
        return Account.INSTANCE;
    }

    of(name: string) {
        let out: Account = new Account();
        out.id = null;
        out.name = name;
        return out;
    }

    fromObject(json: object): Account {
        let out: Account = new Account();
        out.id = json["id"];
        out.name = json["name"];
        return out;
    }

    toPostObject(): object {
        return {"name": this.name};
    }

    toString(): string {
        return this.name;
    }
}