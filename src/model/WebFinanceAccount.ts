export class WebFinanceAccount {
    private id: number;
    private name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }
}

export function FromJson(json: JSON): WebFinanceAccount {
    console.log(json);
    return new WebFinanceAccount(json["id"], json["name"]);
}