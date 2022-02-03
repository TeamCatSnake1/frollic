const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) =>{
    if (res.locals.SSIDValidated === true){
        console.log('skipping cookie generation, SSID was validated')
        return next();
    }
    if (res.locals.SSIDValidated === false){
        if (!req.body.username){
            console.log('cookie check for auth, no login info supplied')
            return next();
        }
    }
    //generates a pseudo-random SSID string to store in our cookie 
    function SSIDGen() {
        let result = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( let i = 0; i < 50; i++ ) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    //set const variable for generated SSID
    const newSSID = SSIDGen();

    //generate response cookie, attach to res.locals so session middleware can access and create a session
    res.cookie('ssid', newSSID, { httpOnly: true });
    res.locals.ssid = newSSID;
    console.log('Setting a cookie: ', res.locals.ssid)

    next();

};

module.exports = cookieController;