const { User } = require("../models");

exports.createUser = async (req, res) => {
    const { name, email, password, role, status } = req.body;

    if (!name || !email || !password || !role || !status) {
        return res.status(400).send({ message: "All fields are required." });
    }

    try {
        const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });
        if (existingUser) {
            return res.status(409).send({ message: "Email already in use." });
        }

        const newUser = await User.create({
            name,
            email: email.toLowerCase(),
            password, // Hashing is handled by the model hook
            role,
            status,
            avatarUrl: `https://picsum.photos/seed/${email}/100` // Unique avatar per email
        });

        // Exclude password from the response
        const userResponse = newUser.toJSON();
        delete userResponse.password;

        res.status(201).json(userResponse);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
        attributes: { exclude: ['password'] } // Exclude password from the result
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const { role, status } = req.body;

    if (!role || !status) {
        return res.status(400).send({ message: "Role and status are required." });
    }
    
    try {
        const [updatedRows] = await User.update(
            { role, status }, 
            { where: { id: userId } }
        );

        if (updatedRows === 0) {
            return res.status(404).send({ message: "User not found or data is unchanged." });
        }

        const updatedUser = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });
        
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
