const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) =>{

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

    return next();

};

module.exports = cookieController;