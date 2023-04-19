const { Pool, Client } = require('pg');
let dbconfig = require('./dbconfig');
const pool = new Pool(dbconfig);
async function checkprevtime(username,timestamp){
    
    var current_timestamp = new Date();

    var currentdate = new Date(); 
    var datetime =  currentdate.getFullYear() + "-"+ (currentdate.getMonth()+1)  + "-" + currentdate.getDate() + " "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds() + "." + currentdate.getMilliseconds();
    if(timestamp===undefined){
        timestamp=datetime;
    }
        let sql = `select * from public.userhistory where username = '${username}';`;
        const response = await pool.query(sql);
        if(response.rows[0]===undefined){
            return{
                message: "Not acceptable",
                status: 406,
            };
        };
        var prevLogintime = response.rows[0].login;
        var prevLogouttime = response.rows[0].logout;
        const x = new Date(`${prevLogintime}`);
        const z = new Date(`${prevLogouttime}`);
        const y = new Date(`${timestamp}`);

        
        if(x < y && z < y){
        return 1;
        }
        else{
            return 0;
        }
}

async function updatespenttime(username){
    //find spent_hours
    let q = `select * from public.userhistory where username = '${username}';`;
    const res = await pool.query(q);
    if(username != undefined){
    var dt1 = new Date(res.rows[0].login);
    var dt2 = new Date(res.rows[0].logout);
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    //update spent_hours
    var spent_hours= 0; 
    spent_hours += Math.abs(Math.round(diff));
    let updatespenttime = `update public.userhistory set spent_hours = '${spent_hours}' where username = '${username}';`;
    const timeupdate = await pool.query(updatespenttime);
    return{
        message: "success",
        status: 200,
        };
    }
    else{
        return{
            message: "Not acceptable",
            status: 406,
        };
    }
}

async function postLogin(username, timestamp){
    var currentdate = new Date(); 
    var datetime =  currentdate.getFullYear() + "-"+ (currentdate.getMonth()+1)  + "-" + currentdate.getDate() + " "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds() + "." + currentdate.getMilliseconds();

    let q2 = `select count(userid) from public.pravinyam_usermaster where userid = '${username}';`;
    const ress = await pool.query(q2);
    var count2 = ress.rows[0].count;
    if(count2==0){
        return{
            message: "Not acceptable",
            status: 406,
        };
    }

    let q = `select count (username) from public.userhistory where username = '${username}';`;
    const res = await pool.query(q);
    var count = res.rows[0].count;
    //if timestamp is not given
    if(timestamp===undefined){
    //if user not present
    if(count==0)
    {
        let insert = `INSERT INTO public.userhistory(username, first_login, login,logout,spent_hours) VALUES ('${username}','${datetime}','${datetime}','${datetime}',0);`;
        const record = await pool.query(insert);
        console.log("welcome "+username);
        return{
            message: "success",
            status: 200,
        };
    }else //if user is present
    {
            let ans =await checkprevtime(username,timestamp);
            if(ans==1){
                let update = `update public.userhistory set login = '${datetime}' where username = '${username}';`;
                const up = await pool.query(update);
                return{
                    message: "success",
                    status: 200,
                    };
                }
                else{
                    return{
                        message: "Not acceptable",
                        status: 406,
                    };
                }
    }
    }
    else //if timestamp is given
    {
    //if user present
        if(count==0)
        {
        let insert = `INSERT INTO public.userhistory(username, first_login, login,logout,spent_hours) VALUES ('${username}',TO_TIMESTAMP('${timestamp}','YYYY-MM-DD HH:MI:SS.MS'),TO_TIMESTAMP('${timestamp}','YYYY-MM-DD HH:MI:SS.MS'),TO_TIMESTAMP('${timestamp}','YYYY-MM-DD HH:MI:SS.MS'),0);`;
        const record = await pool.query(insert);
        }else //if user does not present
        {

                let ans =await checkprevtime(username,timestamp);
                if(ans==1){
                let update = `update public.userhistory set login = TO_TIMESTAMP('${timestamp}','YYYY-MM-DD HH:MI:SS.MS') where username = '${username}';`;
                const up = await pool.query(update);
                return{
                    message: "success",
                    status: 200,
                    };
                }
                else{
                    return{
                        message: "Not acceptable",
                        status: 406,
                    };
                }
        }
    }
}

async function postLogout(username, timestamp){

    let q2 = `select count(userid) from public.pravinyam_usermaster where userid = '${username}';`;
    const ress = await pool.query(q2);
    var count2 = ress.rows[0].count;
    if(count2==0){
        return "error";
    }
    if(timestamp===undefined)
    {
        var currentdate = new Date(); 
        var datetime =  currentdate.getFullYear() + "-"+ (currentdate.getMonth()+1)  + "-" + currentdate.getDate() + " "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds() + "." + currentdate.getMilliseconds();

            let ans =await checkprevtime(username,timestamp);
            if(ans===1){
            //update logout
            let update = `update public.userhistory set logout = '${datetime}' where username = '${username}';`;
            const up = await pool.query(update);
            let st = await updatespenttime(username);
            return{
                message: "success",
                status: 200,
                };
            }
            else{
                return{
                    message: "Not acceptable",
                    status: 406,
                };
            }
    }   
    else if(timestamp != undefined)
    {
        let ans =await checkprevtime(username,timestamp);
            if(ans==1){
            let update = `update public.userhistory set logout = TO_TIMESTAMP('${timestamp}','YYYY-MM-DD HH:MI:SS') where username = '${username}';`;
            const up = await pool.query(update);
            let st = await updatespenttime(username);
            console.log('complete your exercise '+username);
            return{
                message: "success",
                status: 200,
                };
            }
            else{
                return{
                    message: "Not acceptable",
                    status: 406,
                };
            }
    }
    
}

module.exports = {
    postLogin: postLogin,
    postLogout: postLogout
}
