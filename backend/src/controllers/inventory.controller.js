const { InventoryItem } = require("../models");

exports.getAllInventory = async (req, res) => {
    try {
        const inventory = await InventoryItem.findAll();
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
