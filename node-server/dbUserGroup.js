const { Pool, Client, DatabaseError } = require('pg');
let dbconfig = require('./dbconfig');


const pool = new Pool(dbconfig);


async function newUserGroup(user_group, type) {

  let customQuery = "INSERT into public.group_master(user_group,type) values "

  let CheckForIf = (user_group != undefined && type != undefined)

  if (CheckForIf) {
    customQuery += "('" + user_group + "','" + type + "')";
  }

  console.log("Final Query : ", customQuery);
  try {
    const results = await pool.query(customQuery);
    return ({
      message: "New usergroup created",
      status: 201,
    })
  } catch (error) {
    return ({
      message: "Invalid Data Provided",
      status: 406,
    })
  }
}


async function deleteUserGroup(user_group) {

  let groupCountQuery = "SELECT count(userid) from public.pravinyam_usermaster where user_group='" + user_group + "'"

  const userGruopCount = await pool.query(groupCountQuery);
  // console.log("count:", userGruopCount);

  let customQuery = "DELETE from public.group_master "
  if (user_group != undefined) {
    customQuery += "where user_group='" + user_group + "'"
  }

  let message = user_group + " deleted. " + userGruopCount.rows[0].count + " users deleted"

  console.log("Final Query : ", customQuery);
  try {
    const results = await pool.query(customQuery);
    // console.log(results);
    return ({
      message: message,
      status: 204,
    })
  } catch (error) {
    console.log(error);
  }

}



module.exports = {
  newUserGroup: newUserGroup,
  deleteUserGroup: deleteUserGroup,
}