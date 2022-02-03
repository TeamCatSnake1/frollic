const db = require('../model/databaseModel.js')

const sessionController = {};

sessionController.addSession = (req, res, next) =>{
    if (res.locals.SSIDValidated){
        console.log('skipping session generation, SSID was validated')
        return next();
    }
    if (res.locals.SSIDValidated === false){
        if (!req.body.username){
            console.log('cookie check for auth, no login info supplied')
            return next();
        }
    }

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
    //no cookies -> no session. just skip to user verification.
    if (!req.cookies.ssid){
        return next()
    }
    const { ssid } = req.cookies;
    const currentTime = Date.now();
    //if there was a sessionId let's check the DB.
    db.query(`SELECT * FROM public.user WHERE "sessionId"='${ssid}'`)
    .then(result => {
        if (result.rows && result.rows[0].sessionExpiration > currentTime){
            res.locals.username = result.rows[0].username;
            res.locals.displayName = result.rows[0].displayName;
            res.locals.defaultLocation = result.rows[0].defaultLocation;
            res.locals.accommodations = ['wheelchair']
            res.locals.valid = true;
            res.locals.SSIDValidated = true;
            return next(); 
        } else {
            res.locals.valid = false;
            res.locals.reason = "SSID validation failed."
            return next();
        }
    })
    .catch(err => next({
        log: `sessionController.verifySession: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
        message: {err: 'Error at sessionController.verifySession. Check server logs for details.'}
    }));

}

module.exports = sessionController;