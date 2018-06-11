import * as rm from "typed-rest-client/RestClient"
import { WebFinanceAccount } from '../model/WebFinanceAccount';
let restc: rm.RestClient = new rm.RestClient('frontend', "http://localhost:8080/accounts/");

export async function getAccounts(): Promise<WebFinanceAccount[]> {
    try {
        let restRes: rm.IRestResponse<JSON[]> = await restc.get<JSON[]>('');
        let out: WebFinanceAccount[] = [];
        for (let entity of restRes.result) {
            out.push(new WebFinanceAccount(entity));
        }
        return out;
    }
    catch(err) {
        console.error('Failed: ' + err.message);
    }

}

export async function addAccount(account: string): Promise<void> {
    try {
        let data: any = {"name": account};
        let hres: rm.IRestResponse<JSON> = await restc.create<any>('', data)
        console.log(hres);
        return;
    }
    catch(err) {
        console.error('Failed: ' + err.message);
    }

}