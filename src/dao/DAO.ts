import * as rm from "typed-rest-client/RestClient"
import { Entity } from "../model/Entity"

export class DAO<T extends Entity<T>> {

    private client: rm.RestClient;
    private base: T;

    constructor(url: string, base: T) {
        this.client = new rm.RestClient('frontend', url);
        this.base = base;
    }

    async getAll(): Promise<T[]> {
        try {
            let restRes: rm.IRestResponse<object[]> = await this.client.get<object[]>('');
            let out: T[] = [];
            for (let entity of restRes.result) {
                out.push(this.base.fromObject(entity))
            }
            return out;
        }
        catch(err) {
            console.error('Failed: ' + err.message);
        }
    
    }

    async post(t: T): Promise<void> {
        try {
            let data: object = t.toPostObject();
            let hres: rm.IRestResponse<object> = await this.client.create<object>('', data);
            return;
        }
        catch(err) {
            console.error('Failed: ' + err.message);
        }
    }

}

