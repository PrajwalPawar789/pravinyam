const { Pool, Client } = require('pg');
let dbconfig = require('./dbconfig');
let db_exercises = require('./dbExercises');

const pool = new Pool(dbconfig);

async function getTracksSubscribed(userId) {
  if (userId != undefined) {
    return [
      {
        "id": "1",
        "language": "JavaScript"
      },
      {
        "id": "2",
        "language": "C"
      },
      {
        "id": "3",
        "language": "Python"
      },
    ];
    // return "Test JSON"
  } else {
    return [];
  }
}

async function getTotalExercises(module, tracks) {
  if (module != undefined && tracks != undefined) {
    return db_exercises.getExercises(module, tracks)
  } else {
    return db_exercises.getExercises()
  }

}

async function getDateEnrolled(tracks, userId) {
  if (userId != undefined && tracks != undefined) {
    var d = new Date();
    return [
      {
        "tracksSubscribed": tracks,
        "dateEnrolled": d.getFullYear() + "/" + ('0' + (d.getMonth() + 1)).slice(-2) + "/" + ('0' + (d.getDate() - 5)).slice(-2)
      }
    ]
    // (d.getDate() + 5) + "/" + d.getFullYear() + "/" + d.getMonth();
  } else {
    return false;
  }
}

async function getExercisesCompleted(tracks, userId) {
  var arr = await getModuleWiseProgerss(tracks, userId);
  console.log(arr.completedReader);
  var totalComplExercises = arr[0].completedReader + arr[0].completedeDebug + arr[0].completedSolver
  return [
    {
      "exerciseCompleted": totalComplExercises
    }
  ];

}

async function getModuleWiseProgerss(tracks, userId) {
  let readerPerc, debugPerc, solverPerc, reader, solver, debug;
  if (userId != undefined && tracks != undefined) {
    var arrReader = await getTotalExercises("reader", tracks);
    var arrDebug = await getTotalExercises("debug", tracks);
    var arrSolver = await getTotalExercises("solver", tracks);

    let percentToGetReader = 10;
    let percentToGetDebug = 50;
    let percentToGetSolver = 50;

    let arrReaderlength = arrReader.length;
    let arrDebuglength = arrDebug.length;
    let arrSolverlength = arrSolver.length;

    reader = (percentToGetReader / 100) * arrReaderlength
    debug = (percentToGetDebug / 100) * arrDebuglength
    solver = (percentToGetSolver / 100) * arrSolverlength

    readerPerc = (reader / arrReaderlength) * 100
    debugPerc = (debug / arrDebuglength) * 100
    solverPerc = (solver / arrSolverlength) * 100
  }

  return [
    {
      "readerPerc": Math.floor(readerPerc),
      "debugPerc": Math.floor(debugPerc),
      "solverPerc": Math.floor(solverPerc),
      "completedReader": reader,
      "completedeDebug": debug,
      "completedSolver": solver,
    }
  ]
}

module.exports = {
  getTracksSubscribed: getTracksSubscribed,
  getDateEnrolled: getDateEnrolled,
  getExercisesCompleted: getExercisesCompleted,
  getModuleWiseProgerss: getModuleWiseProgerss,
}