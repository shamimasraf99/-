const { Lead } = require("../models");

exports.getAllLeads = async (req, res) => {
    try {
        const leads = await Lead.findAll();
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
