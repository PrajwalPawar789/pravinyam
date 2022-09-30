const { Pool, Client } = require('pg');
let dbconfig = require('./dbconfig');
let data = require('./readExcel');

const pool = new Pool(dbconfig);

async function postLogindemo(username, timestamp){
    var time = timestamp;
    var date = new Date(time);
    // console.log("timestamp is ",date)
    // let spent_hours =0;
    let q = `select count (username) from public.userhistory where username = '${username}';`;
    const res = await pool.query(q);
    console.log(res.rows[0]);
    var count = res.rows[0].count;
    //if user present
    if(count==0)
    {
        let insert = `INSERT INTO public.userhistory(username, first_login, login,spent_hours) VALUES ('${username}','${timestamp}','${timestamp}',0);`;
        const record = await pool.query(insert);
        if(res.length>0){
            console.log("inserted record Done!");
        }
        else{
            console.log("logined");
        }
    }else //if user does not present
    {
        let update = `update public.userhistory set login = '${timestamp}' where username = '${username}';`;
        const up = await pool.query(update);
        console.log('Updated Login');
    }
    console.log(date);
    return date;
}

async function postLogoutdemo(username, timestamp){
    //update logout
    let update = `update public.userhistory set logout = '${timestamp}' where username = '${username}';`;
    const up = await pool.query(update);
    console.log('Updated Logout!');
    //find spent_hours
    let q = `select * from public.userhistory where username = '${username}';`;
    const res = await pool.query(q);
    var dt1 = new Date(res.rows[0].login);
    var dt2 = new Date(res.rows[0].logout);
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;

    //update spent_hours
    var spent_hours= 0; 
    spent_hours += Math.abs(Math.round(diff));
    console.log(Math.abs(Math.round(diff)));
    let updatespenttime = `update public.userhistory set spent_hours = '${spent_hours}' where username = '${username}';`;
    const timeupdate = await pool.query(updatespenttime);
    console.log('Updated spent_minutes!');

    return Math.abs(Math.round(diff));
}

module.exports = {
    postLogindemo: postLogindemo,
    postLogoutdemo: postLogoutdemo
}