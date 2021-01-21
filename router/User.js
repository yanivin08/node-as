let express = require('express');
let router = express.Router();
let bcrypt = require('bcryptjs');
let config = require('config');
let jwt = require('jsonwebtoken');
let auth = require('../middleware/auth');

let User = require('../models/user')

//register new user
router.post('/register',(req,res) => {
    
    const { username, first_name, second_name, email, position, department, user_type, password } = req.body

    console.log(username, first_name, second_name, email, position, department, user_type, password)
    if(!username || !first_name || !second_name || !email || !position || !department || !user_type || !password) {
        return res.status(400).json({ msg: 'Please enter all fields', errorType: 'info'});
    }

    User.findOne({username})
        .then(acct => {
            if(acct) return res.status(400).json({msg: 'Username already exist!', errorType: 'info'});

            const newUser = new User({
                username, 
                first_name, 
                second_name, 
                email, 
                position, 
                department, 
                user_type, 
                password
            })

            //Create hash password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(() => {
                            User.find()
                                .select('-password')
                                .then(users => res.json(users))

                        })
                })
            })
        })

})

//changing passwords
router.post('/change_password', auth, (req,res) => {

    const { old_password, new_password, confirm_password } = req.body
    if(!old_password || !new_password || !confirm_password){
        return res.status(400).json({ msg: 'Please enter all fields', errorType: 'info'});
    }

    User.findById(req.user.id)
        .then(user => {
            bcrypt.compare(old_password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.json({msg: 'Invalid password!', errorType: 'error'})

                    if(new_password == confirm_password){
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(new_password, salt, (err,hash) => {
                                if(err) throw err;
                                user.password = hash;
                                user.change_password = false;
                                user.save()
                                    .then(() => {
                                        res.json({msg: 'Your password has successfully change!', errorType: 'success'})
                                    })
                            })
                        })
                    }else{
                        return res.json({msg: 'New password did not match!', errorType: 'error'})
                    }
                })
        })

})

//changing user information
router.post('/change_info', auth, (req,res) => {
    const { id, username, first_name, second_name, email, position, department } = req.body

    User.findOneAndUpdate({ _id:id },
        {
            username: username,
            first_name: first_name, 
            second_name: second_name, 
            email: email, 
            position: position, 
            department: department
        }
    )
    .then(() => {
        res.json({msg: "Your account information has been updated!", errorType: 'success'})
    })
    .catch(err =>{
        res.json({msg:`Error updating your information: ${err}`, errorType: 'error'})
    })

})

//authenticate user and getting token to request in other routes
router.post('/auth',(req,res) => {
    
    const { username, password } = req.body

    if(!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields', errorType: 'info'});
    }

    User.findOne({username})
        .then(acct => {
            if(!acct) return res.status(400).json({msg: 'User does not exist!', errorType: 'error'});

            //validate password
            bcrypt.compare(password, acct.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({msg: 'Invalid password!'})

                    jwt.sign(
                        { id: acct.id, user_type: acct.user_type, user: acct.change_password },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            //return the token and the id and username
                            res.json({
                                token,
                                user: {
                                    id: acct.id,
                                    user_type: acct.user_type,
                                    user: acct.change_password
                                }
                            })
                        }
                    )
                })
        })

})

//getting all the users
router.get('/users', auth, (req,res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => {
            user.user_type == 'Guest' || user.user_type == 'User'
                ? res.json({})
                : User.find()
                    .select('-password')
                    .then(user => res.json(user))
            })
})


//getting the user information using the token
router.get('/auth', auth, (req,res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})

module.exports = router;