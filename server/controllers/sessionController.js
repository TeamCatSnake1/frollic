const db = require('../model/databaseModel.js')

const sessionController = {};

sessionController.addSession = (req, res, next) =>{

//should follow cookie generation ONLY
//SO -- res.locals.ssid will have the ssid on it
//and cookies are only generated once a user is logged in
//so we can check res.locals.username as well

//can also assume we will not get here if a valid session already exists.

const { ssid, username } = res.locals;
const expiry = Date.now() + (60000*2) //expires in 2 mins -- for testing.

//I have not done UPDATE before. Dunno if this is gonna work? We can create a session row for each user
//at and only at the time we generate the user acct too.
//This way when we make a session there is no conflict with trying to add a user that already exists.
db.query(`
    UPDATE public.user SET "sessionId"='${ssid}', "sessionExpiration"=${expiry} WHERE username='${username}';
    `)
    .then((result) => {
        console.log('update db ')
        return next();
    })
    .catch(err => next({
        log: `sessionController.addSession: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
        message: {err: 'Error at sessionController.addSession. Check server logs for details.'}
    }));
};

sessionController.verifySession = (req, res, next) =>{
//req.cookies 
    if (!req.cookies.ssid){
        //no valid cookie ssid, so skip the DB query
        return next()
    }

    console.log('setting date')
    const currentTime = Date.now();
    //if there was a sessionId let's check the DB.
    db.query(`
        SELECT username FROM user
        WHERE sessionId = ${ssid} AND ${currentTime} < sessionExpiration
    `)
    .then(res => {
        if (res.rows){
            //ssid was found. username should be logged in
            return next();
        } else {
            //ssid was NOT found. username should NOT be logged in.
            return next();
        }
    })
    .catch(err => next({
        log: `sessionController.verifySession: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
        message: {err: 'Error at sessionController.verifySession. Check server logs for details.'}
    }));

}

module.exports = sessionController;