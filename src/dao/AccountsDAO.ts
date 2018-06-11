import * as rm from "typed-rest-client/RestClient"
import { WebFinanceAccount, FromJson } from '../model/WebFinanceAccount';
import { Getter } from "./Getter";
let restc: rm.RestClient = new rm.RestClient('frontend', "http://localhost:8080/accounts");

export async function getAccounts(): Promise<WebFinanceAccount[]> {
    let getter: Getter = new Getter("http://localhost:8080/accounts");

    try {
        return await getter.get(FromJson);
    }
    catch(err) {
        console.error('Failed: ' + err.message);
    }

}

export async function addAccount(account: string): Promise<void> {
    try {
        let data: any = {"name": account};
        let hres: rm.IRestResponse<JSON> = await restc.create<any>('', data)
        return;
    }
    catch(err) {
        console.error('Failed: ' + err.message);
    }

}