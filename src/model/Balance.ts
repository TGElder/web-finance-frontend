export class Balance {
    private lastReading: number;
    private transfersIn: number;
    private transfersOut: number;
    private commitmentsIn: number;
    private commitmentsOut: number;

    public constructor(
        lastReading: number,
        transfersIn: number,
        transfersOut: number,
        commitmentsIn: number,
        commitmentsOut: number,
    ) {
        this.lastReading = lastReading;
        this.transfersIn = transfersIn;
        this.transfersOut = transfersOut;
        this.commitmentsIn = commitmentsIn;
        this.commitmentsOut = commitmentsOut;
    }

    getLastReading(): number {
        return this.lastReading;
    }

    getTransfersIn(): number {
        return this.transfersIn;
    }

    getTransfersOut(): number {
        return this.transfersOut;
    }

    getTransferTotal(): number {
        return this.transfersIn - this.transfersOut;
    }

    getCommitmentsIn(): number {
        return this.commitmentsIn;
    }

    getCommitmentsOut(): number {
        return this.commitmentsOut;
    }

    getCommitmentsTotal(): number {
        return this.commitmentsIn - this.commitmentsOut;
    }

    getTotal(): number {
        return this.getLastReading() + this.getTransferTotal() + this.getCommitmentsTotal();
    }
    

}