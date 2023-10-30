const fs = require('fs');
const mongoose = require('mongoose');
const connect = require('../config/connection');
const { User } = require('../models')
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

let users;

const initialize = () => {

    return new Promise((resolve, reject) => {

        fs.readFile("./data/users.json", "utf8", (err, data) => {

            if (!err) users = JSON.parse(data);
            else { reject("Failure reading Users file..."); return }

        });

        resolve();

    })
    
}

const hashPassword = async (password) => { return bcrypt.hash(password, SALT_WORK_FACTOR); };
  
const seedUsers = async () => {

    await User.deleteMany({});

    const users_hash = await Promise.all(

        users.map(async (user) => {
            const hashedPassword = await hashPassword(user.password);
            return { ...user, password: hashedPassword };
        })

    );
  
    await User.insertMany(users_hash);

}

const seedData = async () => {

    await seedUsers();
    console.log("- - - Seeded User Data from JSON - - -");

}

connect()
    .then(() => initialize())
    .then(() => seedData())
    .then(() => mongoose.connection.close())