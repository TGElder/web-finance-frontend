import * as httpm from 'typed-rest-client/HttpClient';
let httpc: httpm.HttpClient = new httpm.HttpClient('vsts-node-api');

export async function getAccounts(): Promise<JSON> {
    try {
        let res: httpm.HttpClientResponse = await httpc.get('http://localhost:8080/accounts');
        let body = await res.readBody();
        return JSON.parse(body);
    }
    catch(err) {
        console.error('Failed: ' + err.message);
    }

}