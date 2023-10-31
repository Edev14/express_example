const fs = require('fs');
const sequelize = require('../config/connection');
const { User } = require('../models');

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
  
const seedUsers = () => User.bulkCreate(users, { individualHooks: true });

const seedData = async () => {

    await sequelize.sync({ force: true });
    await seedUsers();

    console.log('- - - DATA SEEDED from JSON');

}

initialize()
    .then(() => seedData())
    .then(() => process.exit())