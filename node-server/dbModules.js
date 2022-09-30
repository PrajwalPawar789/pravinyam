const {Pool, Client} = require('pg');
let dbconfig = require('./dbconfig');

const pool  = new Pool(dbconfig);

async function getModules(moduleid, module) {

    let customQuery = "SELECT * FROM public.modulemaster ";
    var addSuffixForAnd = false;
    if (moduleid != undefined){
        var moduleidVal = parseInt(moduleid);
        customQuery += "where moduleid=" + moduleidVal +"";
        addSuffixForAnd = true;
        console.log("After moduleid: " + customQuery);
    }
    if (module != undefined){
        if (addSuffixForAnd) {
            customQuery += " and module='" + module +"'";
        } else{
            customQuery += "where module='" + module +"'";
        }
        console.log("After module: " + customQuery);
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
    getModules: getModules
}
