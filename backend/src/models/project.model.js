module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("project", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('চলমান', 'সম্পন্ন', 'বাতিল', 'হোল্ড'),
            allowNull: false
        },
        progress: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        team: {
            type: Sequelize.JSON
        },
        dueDate: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Project;
};
