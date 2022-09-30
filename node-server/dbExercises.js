const { Pool, Client } = require('pg');
let dbconfig = require('./dbconfig');

const pool = new Pool(dbconfig);

async function getExercises(module, lang, level) {

    let customQuery = "SELECT * FROM public.cexercises ";
    var addSuffixForAnd = false;
    if (module != undefined) {
        customQuery += "where module='" + module + "'";
        addSuffixForAnd = true;
        console.log("After moddule: " + customQuery);
    }
    if (lang != undefined) {
        if (addSuffixForAnd) {
            customQuery += " and language='" + lang + "'";
        } else {
            customQuery += "where language='" + lang + "'";
        }
        console.log("After lang: " + customQuery);
        addSuffixForAnd = true;
    }
    if (level != undefined) {
        var levelVal = parseFloat(level);
        if (addSuffixForAnd) {
            customQuery += " and level=" + levelVal + "";
        } else {
            customQuery += "where level=" + levelVal + "";
        }
        console.log("After level: " + customQuery);
        addSuffixForAnd = true;
    }

    try {

        const results = await pool.query(customQuery);
        console.log("Final query: " + customQuery);
        return results.rows;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getExercises: getExercises
}
