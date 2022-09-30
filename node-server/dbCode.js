const { Pool, Client } = require('pg');
let dbconfig = require('./dbconfig');
const pool = new Pool(dbconfig);
//const { utf8ToAnsi } = require('utf8-to-ansi');

const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
//const fs = require("fs");
const SPACES_KEY = '3RUQKV4KAN2QW7H7LV66';
const SPACES_SECRET = 'F7XSE0V/1/488/SafCCZvpnhysKBJH5ieLi3+YYtQGY';
// console.log(process.env.SPACES_SECRET);
const client = new S3Client({
  endpoint: "https://fra1.digitaloceanspaces.com",
  //endpoint: "https://nyc3.digitaloceanspaces.com",
  region: "us-east-1",
  credentials: {
    accessKeyId: SPACES_KEY,
    secretAccessKey: SPACES_SECRET
  }
});

// Function to turn the file's body into a string.
const streamToString = (stream) => {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
};

async function getCode(exercise) {

  let customQuery = "SELECT qlocation FROM public.cexercises " + "where exid='" + exercise + "'";
  //   var exFile = undefined;
  try {

    const results = await pool.query(customQuery);
    console.log("Final query: " + customQuery);
    console.log("Filename =" + results.rows[0].qlocation);
    //        return results.rows;
    exFile = results.rows[0].qlocation;
    console.log("File = " + exFile);
  } catch (error) {
    console.log("Error while getting filename" + error);
  }
  if (!(exFile === undefined)) {
    const bucketParams = {
      Bucket: "pravinyam-programs",
      Key: exFile
    };
    try {
      const response = await client.send(new GetObjectCommand(bucketParams));
      const data = await streamToString(response.Body);
      //           console.log("Response body = " + response.Body.toString());
      //            fs.writeFileSync("C:/Downloads/" + exFile, data);
      console.log("Success", "\n" + data);
      return data;
      //         const ansi = utf8ToAnsi(data);
      //           console.log("Ansi coverted is \n" + ansi);
      //          return utf8ToAnsi(ansi);
      //           return exFile;
    } catch (err) {
      console.log("Error", err);
    }
  } else {
    return Error("Cannot get code for the Exercise: " + exercise);
  }
}

module.exports = {
  getCode: getCode
}
