let express = require('express');//Import the express dependency
let dbconfig = require('./dbconfig');
const { Pool, Client } = require('pg');
let db_modules = require('./dbModules');
let db_exercises = require('./dbExercises');
let db_questions = require('./dbQuestions');
let db_code = require('./dbCode');
let db_UserProgress = require('./dbUserProgress')
let db_testUserGroupData = require('./testUserGroup');
let db_TestSingleUser = require('./testUser')
let db_UserData = require('./dbUser')
let db_UserGroup = require('./dbUserGroup')
let code_dir = 'C:/Downloads/';
let dbUserHistory =require('./dbUserHistory');
let testuserhistory = require('./testuserhistory');
let dbUserLogin = require('./dbUserLogin');
let testUserLogin = require('./testuserlogin');

const app = express();         //Instantiate an express app, the main work horse of this server
//const port = 5000;             //Save the port number where your server will be listening

//Idiomatic expression in express to route and respond to a client request
const pool = new Pool(dbconfig);
let router = express.Router();
let bodyParser = require('body-parser');
let cors = require('cors');
let http = require('http');
let url = require('url');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    console.log("exec: middleware");
    next();
});
//getModules

router.route('/modules').get((request, response) => {
    console.log(request.query);
    db_modules.getModules(request.query.moduleid, request.query.module).then(result => {
        response.json(result);
    })
});



router.route('/exercises').get((request, response) => {
    console.log(request.query);
    db_exercises.getExercises(request.query.module, request.query.language, request.query.level).then(result => {
        response.json(result);
    })
});

router.route('/userprogress/tracksSubscribed').get((request, response) => {
    console.log(request.query);
    db_UserProgress.getTracksSubscribed(request.query.userId).then(result => {
        response.json(result);
    })
});

router.route('/userprogress/dateEnrolled').get((request, response) => {
    console.log(request.query);
    db_UserProgress.getDateEnrolled(request.query.tracks, request.query.userId).then(result => {
        response.json(result);
    })
});

router.route('/userprogress/exerciseCompleted').get((request, response) => {
    console.log(request.query);
    db_UserProgress.getExercisesCompleted(request.query.tracks, request.query.userId).then(result => {
        response.json(result);
    })
});

router.route('/userprogress/moduleProgress').get((request, response) => {
    console.log(request.query);
    db_UserProgress.getModuleWiseProgerss(request.query.tracks, request.query.userId).then(result => {
        response.json(result);
    })
});


router.route('/singleuser/newuser').post((request, response) => {
    console.log("query", request.query);
    db_UserData.createNewUser(request.query.userid, request.query.password, request.query.role, request.query.usergroup)
        .then(result => {
            response.status(result.status).json(result)
        })
});

router.route('/singleuser/deleteuser').delete((request, response) => {
    console.log("query", request.query);
    db_UserData.deleteUser(request.query.userid)
        .then(result => {
            response.json(result)
        })
});

router.route('/singleuser/testadduser').post((request, response) => {
    console.log("query", request.query);
    db_TestSingleUser.testAddUser()
        .then(result => {
            response.json(result)
        })
});



router.route('/singleuser/testdeleteuser').delete((request, response) => {
    console.log("query", request.query);
    db_TestSingleUser.testDeleteUser()
        .then(result => {
            response.json(result)
        })
});

router.route('/usergroup/addusergroup').post((request, response) => {
    console.log(request.query);
    db_UserGroup.newUserGroup(request.query.user_group, request.query.type)
        .then(result => {
            console.log(result);
            response.status(result.status).json(result)
        })
});

router.route('/usergroup/deleteusergroup').delete((request, response) => {
    console.log(request.query);
    db_UserGroup.deleteUserGroup(request.query.user_group)
        .then(result => {
            console.log(result);
            response.json(result)
        })
});

router.route('/usergroup/testaddusergroup').post((request, response) => {
    console.log(request.query);
    db_testUserGroupData.testAddUserGroup()
        .then(result => {
            console.log(result);
            response.json(result)
        })
});

router.route('/usergroup/testdeleteusergroup').delete((request, response) => {
    console.log(request.query);
    db_testUserGroupData.testDeleteUserGroup()
        .then(result => {
            console.log(result);
            response.json(result)
        })
});


router.route('/questions').get((request, response) => {
    console.log(request.query);
    db_questions.getQuestions(request.query.exercise, request.query.answers).then(result => {
        response.json(result);
    })
});

router.route('/postLogin').get((request, response) => {
    console.log(request.query);
    dbUserHistory.postLogin(request.query.username, request.query.timestamp).then(result => {
        response.json(result);
    })
});

router.route('/postLogout').get((request, response) => {
    console.log(request.query);
    dbUserHistory.postLogout(request.query.username, request.query.timestamp).then(result => {
        response.json(result);
    })
});

router.route('/testuserhistory').get((request, response) => {
    console.log(request.query);
    testuserhistory.testuserhistory().then(result => {
        response.json(result);
    })
});

router.route('/userLogin').get((request, response) => {
    console.log(request.query);
    dbUserLogin.userLogin(request.query.username, request.query.password).then(result => {
        response.json(result);
    })
});

router.route('/userLogout').get((request, response) => {
    console.log(request.query);
    dbUserLogin.userLogout(request.query.username, request.query.password).then(result => {
        response.json(result);
    })
});

router.route('/testUserLogin').get((request, response) => {
    console.log(request.query);
    testUserLogin.testUserLogin().then(result => {
        response.json(result);
    })
});

router.route('/code').get((request, response) => {
    console.log(request.query);
    db_code.getCode(request.query.exercise).then(result => {
        //     console.log('Result for code is: \n' + result);
        //    console.log('Result for code after processing is: \n' + result.replace(/(?:\r\n|\r|\n)/g, '<br>'));

        response.json(result);
        //     response.json(result.replace(/\r\n/g, ''));
        //     response.send(result.replace(/\r\n/g, ''));
        //    response.send(result.replace(/(?:\r\n|\r|\n)/g, '<br>'));
        //   response.send(new Buffer(result));
        //    response.sendFile(result, {root: code_dir});      //server responds by sending the index.html file to the client's browser
    })
});

app.get('/*', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', { root: __dirname });      //server responds by sending the index.html file to the client's browser
    //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});
//const code = download.downloadFile();
//console.log('Code is :\n' + code);
const port = process.env.PORT || 8090;
app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
});
