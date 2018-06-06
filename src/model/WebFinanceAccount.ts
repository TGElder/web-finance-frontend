export class WebFinanceAccount {
    private id: number;
    private name: string;

    constructor(json: JSON) {
        this.id = json["id"];
        this.name = json["name"];
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }
}