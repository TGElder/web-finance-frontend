import * as rm from "typed-rest-client/RestClient"

export class Getter {

    private restc: rm.RestClient;

    constructor(url: string) {
        this.restc = new rm.RestClient('frontend', url);
    }

    async get<T>(fromJson: (json: JSON) => T): Promise<T[]> {
        try {
            let restRes: rm.IRestResponse<JSON[]> = await this.restc.get<JSON[]>('');
            console.log(restRes);
            let out: T[] = [];
            for (let entity of restRes.result) {
                out.push(fromJson(entity));
            }
            return out;
        }
        catch(err) {
            console.error('Failed: ' + err.message);
        }
    
    }

}

