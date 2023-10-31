const { User } = require('../models');

const userController = {

    getUsers(req, res) {

        User.findAll({ raw: true })
            .then(data => res.json(data))
            .catch(err => res.json(err))

    },

    getUserById({ params }, res) {

        User.findOne({ raw: true, where: { id: params.id } })
            .then(data => res.json(data))
            .catch(err => res.json(err))

    },

    postUser({ body }, res) {

        User.create(body)
            .then(data => res.json(data))
            .catch(err => res.json(err))

    },

    deleteUser({ params }, res) {

        User.destroy({ where: { id: params.id } })
            .then(data => res.json(data))
            .catch(err => res.json(err))

    },

    loginUser(req, res) {

        User.findOne({ where: { email: req.body.email } })

        .then(data => {

            if (!data) { res.status(404).json({ message: 'No user found...' }); return; }

            const validPassword = data.checkPassword(req.body.password);
            if (!validPassword) { res.status(400).json({ message: 'Incorrect credentials...' }); return; }

            req.session.save(() => {

                req.session.user_id = data._id
                req.session.username = data.username;
                req.session.email = data.email;
                req.session.loggedIn = true;
        
                res.json({ user: data, message: ` ${data.username} is now logged in...` });

            });

        })

        .catch(err => res.status(400).json(err));

    },

    logoutUser(req, res) {

        if (req.session.loggedIn) req.session.destroy(() => res.status(204).end());
        else res.status(404).end();

    },

    restricted(req, res) {

        res.json('Restricted area, logged in users only...');

    },

}

module.exports = userController;