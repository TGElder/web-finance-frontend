import { Entity } from "./Entity";
import { Commitment } from "./Commitment";

export class CommitmentClosure implements Entity<CommitmentClosure> {
    private commitment: Commitment;
    private closed: Date;

    private static INSTANCE: CommitmentClosure = new CommitmentClosure();

    getCommitment(): Commitment {
        return this.commitment;
    }

    getClosed(): Date {
        return this.closed;
    }

    static base(): CommitmentClosure {
        return CommitmentClosure.INSTANCE;
    }

    of(commitment: Commitment, closed: Date) {
        let out: CommitmentClosure = new CommitmentClosure();
        out.commitment = commitment;
        out.closed = closed;
        return out;
    }

    fromObject(json: object): CommitmentClosure {
        return new CommitmentClosure();
    }

    toPostObject(): object {
        return {
            "commitment": {"id": this.commitment.getId()},
            "epochSecond": this.getClosed().getTime() / 1000
        };
    }
}