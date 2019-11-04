module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }


        req.flash('error_msg', 'You do not have access to this page.')
        res.redirect('/users/login')

    }
}

