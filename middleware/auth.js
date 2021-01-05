//this is to authenticate each access to routes
//this will verify the token if it is valid

let config = require('config');
let jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token')

    //check for token
    if(!token) res.status(401).json({msg: 'Unauthorize access!'})

    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        //add user from payload
        req.user = decoded;
        next();
    }catch(e){
        res.status(400).json({msg: e})
    }

}

module.exports = auth;