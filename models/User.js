const { Schema, model, Types } = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const { isEmailValid } = require('../utils/helpers');

const UserSchema = new Schema(
    
    {

        username: {
            type: String,
            required: 'Username is Required',
            trim: true,
            unique: true
        },

        email: {
            type: String,
            required: 'E-mail is Required',
            trim: true,
            validate: [ isEmailValid, 'E-mail is not valid.' ],
            unique: true
        },
        
        password: {
            type: String,
            required: 'Password is Required',
        },

    },

    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    }

);

UserSchema.pre('save', async function save(next) {

    if (!this.isModified('password')) return next();

    try {

        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();

    } catch (err) { return next(err); }

});

UserSchema.methods.validatePassword = function validatePassword(data) { return bcrypt.compareSync(data, this.password) };
const User = model('User', UserSchema);

module.exports = User;