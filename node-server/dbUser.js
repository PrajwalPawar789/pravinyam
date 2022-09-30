const { Pool, Client, DatabaseError } = require('pg');
let dbconfig = require('./dbconfig');
const pool = new Pool(dbconfig);


async function createNewUser(userid, password, role, user_group) {
    // console.log(userid);
    let customQuery = "INSERT into public.pravinyam_usermaster(userid, password, role, user_group)values";
    let CheckForIf = (userid !== undefined && password !== undefined && role !== undefined && user_group !== undefined);


    if (CheckForIf) {
        customQuery += "('" + userid + "','" + password + "','" + role + "','" + user_group + "')";
    }
    console.log("Final Query : ", customQuery);

    try {
        const results = await pool.query(customQuery);
        return {
            message: "User created",
            status: 201,
        };
    } catch (error) {
        var tracesss = error.stack.substring(6)
        console.log("trace", tracesss);
        return {
            message: "Invalid details provided",
            status: 406,
            // error: error.stack
        }
    }
}

async function deleteUser(userid) {
    // console.log(userid);
    let customQuery = "DELETE from public.pravinyam_usermaster";


    if (userid !== undefined) {
        customQuery += " where userid='" + userid + "'"
        // + " and password=" + password + "and role=" + role + "'and user_group=" + user_group;
    }

    console.log("Final query: " + customQuery);
    try {
        const results = await pool.query(customQuery);
        return {
            message: "User deleted",
            status: 204,
        };
    } catch (error) {
        console.log(error);
    }
}

//Implement reset password


module.exports = {
    createNewUser: createNewUser,
    deleteUser: deleteUser,
}