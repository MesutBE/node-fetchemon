// require dependencies
const fs = require('fs');
const path = require('path');
const nodeFetch = require('node-fetch');
const assert = require('assert');

// declare constants
const START = Date.now();
const REPORT_FILE = __dirname + '/' + path.basename(__filename).replace('.js', '-report.txt');

// define logging function
const log = (msg) => {
    const now = `${Date.now() - START} ms: `;
    console.log(now + msg);
    if (typeof msg === 'string') {
        const cleanedString = msg
            // remove special characters used to print assertion colors in terminal
            .replace(/\[31m|\[32m|\[39m/g, '')
            // remove the file path from error messages for privacy and readability
            .replace(new RegExp(__dirname, "g"), ' [ ... ] ');
        fs.appendFileSync(REPORT_FILE, now + cleanedString + '\n');
    } else {
        const stringifiedMsg = JSON.stringify(msg);
        fs.appendFileSync(REPORT_FILE, now + stringifiedMsg + '\n');
    };
};

// log when a user forces the script to exit
process.on('SIGINT', function onSIGINT() {
    log('Ctrl-C');
    process.exit(2);
});

// log uncaught errors
const handleError = (err) => {
    log(err);
    process.exit(1);
};
process.on('uncaughtException', handleError);
process.on('unhandledRejection', handleError);

// (re)initialize report file
fs.writeFileSync(REPORT_FILE, '');
log((new Date()).toLocaleString());


// --- begin main script ---

const findWhat = {
    item: 'item',
    move: 'move',
    pokemon: 'pokemon',
    type: 'type',
    evolutionChain: 'evolution-chain',
};

const main = async (URL) => {
    try {
        const res = await nodeFetch(URL);
        // assert.strictEqual(res.ok, true);
        // assert.strictEqual(res.status, 200);

        const data = await res.json();

        // if (data.cost === 3000
        //     && data.fling_power === 30
        //     && data.fling_effect === null) {

        //     log(`${data.name} - ${data.cost} - ${data.fling_power} - ${data.fling_effect}`);

        // }

        // if (data.accuracy === 85
        //     && data.pp === 40) {

        //     log(`${data.name} - ${data.accuracy} - ${data.pp} - ${data.priority} - ${data.power}`);

        // }


        // if (data.height === 13
        //     && data.weight === 1
        //     && data.base_experience === 62) {

        //     log(`${data.name} - ${data.height} - ${data.weight} - ${data.base_experience}`);

        // }


        // if (data.pokemon.length === 44
        //     && data.moves.length === 25) {

        //     log(`${data.name} - ${data.damage_relations}`);

        // }


        // if (data.moves.length === 71
        //     && data.abilities[0].ability.name === 'hustle') {

        //     log(`${data.name}`);

        // }

        if (data.moves.length === 28) {

            log(`${data.name}`);

        }

    } catch (err) {
        log(err.stack);
    };
};

for (let i = 1; i <= 1000; i++) { //1005

    main(`https://pokeapi.co/api/v2/${findWhat.pokemon}/${i}`);

}
// For move...