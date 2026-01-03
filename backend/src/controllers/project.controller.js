const { Project } = require("../models");

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
