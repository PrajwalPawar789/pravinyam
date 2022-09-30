const { Pool, Client } = require('pg');
let dbconfig = require('./dbconfig');

const pool = new Pool(dbconfig);

async function getQuestions(exercise, answers) {

    let customQuery = "SELECT key, label, type, options FROM public.cqadata ";
    if (exercise != undefined && answers != undefined) {
        var ans = answers === "true";
        if (ans) {
            customQuery = "SELECT key, answer FROM public.cqadata ";
            customQuery += "where exid='" + exercise + "'ORDER BY key";
            console.log("After answer = true: " + customQuery);
        } else {
            customQuery += "where exid='" + exercise + "'ORDER BY key";
            console.log("After answer = false: " + customQuery);
        }
    } else if (exercise != undefined) {
        customQuery += "where exid='" + exercise + "'ORDER BY key";
        console.log("After exercise: " + customQuery);
    } else {
        return ([]);
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
    getQuestions: getQuestions
}