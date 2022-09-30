const { Pool, Client } = require('pg');
let dbconfig = require('./dbconfig');
let data = require('./readExcel');
const dbUserHistory = require('./dbUserHistory');
const pool = new Pool(dbconfig);

async function userLogin(username,password){
    //validate user and return 
    var currentdate = new Date(); 
    var datetime =  currentdate.getFullYear() + "-"+ (currentdate.getMonth()+1)  + "-" + currentdate.getDate() + " "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds() + "." + currentdate.getMilliseconds();

    let q2 = `select count(userid) from public.pravinyam_usermaster where userid = '${username}' and password ='${password}';`;
    const ress = await pool.query(q2);
    var count2 = ress.rows[0].count;
    if(count2==0){
        return{
            message: "Not acceptable",
            status: 406,
        };
    }
    else{
        var toCall = await dbUserHistory.postLogin(username);
        return toCall;
    }
}

async function userLogout(username,password){
    var currentdate = new Date(); 
    var datetime =  currentdate.getFullYear() + "-"+ (currentdate.getMonth()+1)  + "-" + currentdate.getDate() + " "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds() + "." + currentdate.getMilliseconds();

    let q2 = `select count(userid) from public.pravinyam_usermaster where userid = '${username}' and password ='${password}';`;
    const ress = await pool.query(q2);
    var count2 = ress.rows[0].count;
    // console.log(count2);
    if(count2==0){
        return{
            message: "Not acceptable",
            status: 406,
        };
    }
    else{
        var toCall = await dbUserHistory.postLogout(username);
        return  toCall;
    }
    
}

module.exports={
    userLogin:userLogin,
    userLogout:userLogout
}