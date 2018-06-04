import {getAccounts} from "./dao/AccountsDAO"
const hx = require("./resources/hexagon/hexagon.js")

async function run(): Promise<void> {
    try {
        let json = await getAccounts();
        document.body.innerHTML = JSON.stringify(json);
        hx.select('#card-container').classed('hx-group hx-horizontal', true).add(hx.section());
    }
    catch(err) {
        console.error(err);
    }
}

run