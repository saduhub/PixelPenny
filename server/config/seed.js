const db = require('./connection');
const { User } = require('../models')

db.once('open', async () => {
    await User.deleteMany();
    const user1 = new User({
        userName: "JohnDoe",
        email: "john.doe@example.com",
        password: "johnpassword123",
    });
    const user2 = new User({
        userName: "JaneDoe",
        email: "jane.doe@example.com",
        password: "janepassword123",
    });
    await user1.save();
    await user2.save();
    console.log('Successfully seeded users.');

    process.exit();
})
