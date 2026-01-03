const bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.ENUM('অ্যাডমিন', 'কর্মী', 'ম্যানেজার'),
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('সক্রিয়', 'নিষ্ক্রিয়'),
            defaultValue: 'সক্রিয়'
        },
        avatarUrl: {
            type: Sequelize.STRING
        }
    });

    // Hash password before creating a user
    User.beforeCreate(user => {
        user.password = bcrypt.hashSync(user.password, 10);
    });

    return User;
};
