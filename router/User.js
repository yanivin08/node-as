let express = require('express');
let router = express.Router();
let bcrypt = require('bcryptjs');
let config = require('config');
let jwt = require('jsonwebtoken');
let auth = require('../middleware/auth');

let User = require('../models/user')

//register new user
router.post('/register',(req,res) => {
    
    const { username, password } = req.body

    if(!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields'});
    }

    User.findOne({username})
        .then(acct => {
            if(acct) return res.status(400).json({msg: 'Username already exist!'});

            const newUser = new User({
                username,
                password
            })

            //Create hash password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.username
                                        }
                                    })
                                }
                            )
                            
                           
                        })
                })
            })
        })

})


router.post('/auth',(req,res) => {
    
    const { username, password } = req.body

    if(!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields'});
    }

    User.findOne({username})
        .then(acct => {
            if(!acct) return res.status(400).json({msg: 'User does not exist!'});

            //validate password
            bcrypt.compare(password, acct.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({msg: 'Invalid password!'})

                    jwt.sign(
                        { id: acct.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: acct.id,
                                    name: acct.username
                                }
                            })
                        }
                    )
                })
        })

})

router.get('/auth', auth, (req,res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})

module.exports = router;