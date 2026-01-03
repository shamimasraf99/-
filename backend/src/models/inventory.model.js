module.exports = (sequelize, Sequelize) => {
    const InventoryItem = sequelize.define("inventory_item", {
        productName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sku: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false
        },
        stock: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    return InventoryItem;
};
