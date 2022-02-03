const db = require('../model/databaseModel.js')
const CryptoJS = require('crypto-js');
const secret = 'shhh its a secret'
const authController = {};


// let string = 'encrypt me john and eric'

// let ciphertext = CryptoJS.AES.encrypt(string, 'secret key 123').toString();

// let bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');

// let orig = bytes.toString(CryptoJS.enc.Utf8);


authController.addUser = (req, res, next) =>{
    const { username, displayName, defaultLocation } = req.body;
    let password = req.body.password;
    let cipherPass = CryptoJS.AES.encrypt(password, secret).toString();

    //bcrypt password before adding

    const addUserQuery = `INSERT INTO public.user (username, password, "displayName", "defaultLocation", "sessionId", "sessionExpiration") VALUES ($1, $2, $3, $4, $5, $6);`
    const query = 
        {
        text: addUserQuery,
        values: [username, cipherPass, displayName, defaultLocation, 'nosession', 1]
        }

    //db.query(query.text, query.values)
    db.query(query.text, query.values)
        .then(result => {
            res.locals.username = username;
            res.locals.displayName = displayName;
            res.locals.defaultLocation = defaultLocation;
            res.locals.valid = true;
            res.locals.accommodations = ['wheelchair'];
            return next();
        })
        .catch(err => next({
            log: `authController.addUser: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
            message: {err: 'Error at authController.addUser. Check server logs for details.'}
        }));


};

authController.verifyUser = (req, res, next) =>{
    //skip verifying user if SSID was validated
    if (res.locals.SSIDValidated === true){
        return next();
    }
    if (res.locals.SSIDValidated === false && req.body.username === 'cookieEvaluation'){
       console.log('verifyUser: attempted login via cookie, session validation failed')
       res.locals.failedCookie = true;
       res.locals.valid = false;
       return next();
    }
    

    //code to verify user
    const { username, password } = req.body;
   

    const verifyUserQuery = `SELECT * FROM public.user WHERE username='${username}'`
    db.query(verifyUserQuery)
        .then(result => {
            let bytes = CryptoJS.AES.decrypt(result.rows[0].password, secret);
            let original = bytes.toString(CryptoJS.enc.Utf8);
            if (password === original){
                res.locals.valid = true;
                res.locals.username = result.rows[0].username;
                res.locals.displayName = result.rows[0].displayName;
                res.locals.defaultLocation = result.rows[0].defaultLocation;
                res.locals.accommodations = ['wheelchair'] //result.rows[0].accommodations;
                // res.locals.venues = result.rows[0].venues

            }
            
            return next()
        })
        .catch (err => next({
            log: `authController.verifyUser: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
            message: {err: 'Error at authController.verifyUser. Check server logs for details.'}
    }))

}

authController.logOut = (req, res, next) => {
    res.clearCookie('ssid');
    res.locals.valid = true;
    return next()
}


module.exports = authController;



// POST /authentication
//   req.body = { username: string, password: string, displayName: string, location: string(zipcode) }
//   response = if false { valid: false, reason: string }
//   response = if true { valid: true, username: string, displayName: string, accommodations: array, venues: array }

// GET /authentication
//   req.body = { username: string, password: string }
//   response = if false { valid: false }
//   response = if true { valid: true, username: string, displayName: string, accommodations: array, venues: array } // accommodations and venues are stretch goals