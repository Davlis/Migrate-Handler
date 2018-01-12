const User = require('../models/user');

module.exports = () => new Promise(async (resolve, reject) => {
    const users = await User.find();

    for (const user of users) {
        user.name = user.first_name + ' ' + user.last_name;
    }

    Promise.all(
        users.map(u => u.save())
    ).then(result => {
        resolve(result);
    }).catch(err => {
        reject(err);
    });

});
