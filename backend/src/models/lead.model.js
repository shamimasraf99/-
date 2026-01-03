module.exports = (sequelize, Sequelize) => {
    const Lead = sequelize.define("lead", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        company: {
            type: Sequelize.STRING,
            allowNull: false
        },
        value: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        ownerAvatar: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM('নতুন লিড', 'যোগাযোগ হয়েছে', 'প্রস্তাব পাঠানো হয়েছে', 'জয়ী'),
            allowNull: false
        }
    });

    return Lead;
};
