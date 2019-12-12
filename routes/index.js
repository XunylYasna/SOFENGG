const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

const PRF = require('../model/PRF')


// ROUTE FOR THE MAP AND POSTS



// Displaying
router.get('/', (req, res) => {
    res.render('login')
})




// Adding a post, storing the post to DB
router.post('/addStory', ensureAuthenticated, (req, res) => {

    // const { title, writeup, location, picture } = req.body;
    // const newPost = new Post({
    //     title: title,
    //     writeup: writeup,
    //     author: req.user,
    //     location: location,
    //     date: Date.now(),
    //     picture: picture
    // })

    // newPost.save()
    //     .then(post => {
    //         req.flash('success_msg', 'New story added.')
    //         res.redirect('/')
    //     })
    //     .catch(err => console.log(err))
})

// Viewing post
router.get('/view', (req, res) => {
    // var postid = req.query.post_id

    // Post.findOne({ _id: postid })
    //     .then(post => {
    //         res.render('story', {
    //             post: post
    //         })
    //     })
})

// Searching post
router.get('/search', (req, res) => {
    // var search = req.query.search

    // Post.find({ "title": { "$regex": search, "$options": "i" } }, function (err, posts) {
    //     if (err) return handleError(err)

    //     res.render('map', {
    //         user: req.user,
    //         posts: posts
    //     })
    // });
})

// Realtime updates to multiple clients liking

module.exports = router;
