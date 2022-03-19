const db = require('../model/databaseModel.js')

const sessionController = {};

sessionController.addSession = (req, res, next) =>{
    if (res.locals.SSIDValidated){
        return next();
    }
    if (!res.locals.valid){
        return next();
    }

const { ssid, username } = res.locals;
const expiry = Date.now() + (60000*2) 
db.query(`
    UPDATE public.user SET "sessionId"='${ssid}', "sessionExpiration"=${expiry} WHERE username='${username}';
    `)
    .then((result) => {
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
        res.locals.SSIDValidated = false;
        res.locals.username = req.body.username;
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
            res.locals.SSIDValidate = false;
            return next();
        }
    })
    .catch(err => next({
        log: `sessionController.verifySession: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
        message: {err: 'Error at sessionController.verifySession. Check server logs for details.'}
    }));

}

module.exports = sessionController;