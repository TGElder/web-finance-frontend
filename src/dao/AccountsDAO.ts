import * as httpm from 'typed-rest-client/HttpClient';
import { WebFinanceAccount } from '../model/WebFinanceAccount';
let httpc: httpm.HttpClient = new httpm.HttpClient('vsts-node-api');

export async function getAccounts(): Promise<WebFinanceAccount[]> {
    try {
        let res: httpm.HttpClientResponse = await httpc.get('http://localhost:8080/accounts');
        let body: string = await res.readBody();
        let out: WebFinanceAccount[] = [];
        for (let entity of JSON.parse(body)) {
            out.push(new WebFinanceAccount(entity));
        }
        return out;
    }
    catch(err) {
        console.error('Failed: ' + err.message);
    }

}