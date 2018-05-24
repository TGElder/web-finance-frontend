import {getAccounts} from "./dao/AccountsDAO"

async function run(): Promise<void> {
    try {
        let json = await getAccounts();
        document.body.innerHTML = JSON.stringify(json);
    }
    catch(err) {
        console.error(err);
    }
}

run