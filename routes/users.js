const express = require('express');
const router = express.Router();

// User Model
const User = require('../model/User');

// Passport
const passport = require('passport')

// Encrypting user password
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => res.render("login"))


// Register Handle
router.post('/register', (req, res) => {

    const { name, email, password, password2 } = req.body;

    let errors = [];

    // Check required fields
    if (!name || !email || !password || !password2) {
        errors.push('Please fill in all fields.')
    }

    // Confirm password
    if (password != password2) {
        errors.push('Passwords do not match.')
    }

    // Check pass length
    if (password.length < 6) {
        errors.push('Password should be at least 6 characters.')
    }



    if (errors.length > 0) {
        res.render('register', {
            errors, name, email, password, password2,
        })
    }

    else {
        // Check existing user
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push('Email is already registered.')
                    res.render('register', {
                        errors, name, email, password, password2,
                    })
                }

                else {
                    // Add user to DB
                    const newUser = new User({
                        name,
                        email,
                        password
                    })

                    // Hash Password
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            throw err
                        }

                        else {
                            newUser.password = hash

                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'Registration successful.')
                                    res.redirect('/users/login')
                                })
                                .catch(err => console.log(err))
                        }
                    }));


                }
            })

    }

})

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true,
        successFlash: true
    })(req, res, next)

})

// Logout
router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'You are logged out.')
    res.redirect('/')
})

module.exports = router;
