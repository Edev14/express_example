const withAuth = (req, res, next) => {

    if (req.session.loggedIn) { next(); } 
    else { res.status(401).json('You are not logged in'); }

}

module.exports = withAuth;