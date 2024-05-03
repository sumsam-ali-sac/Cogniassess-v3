import Role from "../models/role.model.js";

export const getAllRoles = async (req, res) => {
	try {
		const roles = await Role.find();
		res.json(roles);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const createRole = async (req, res) => {
	const role = new Role(req.body);
	try {
		const savedRole = await role.save();
		res.status(201).json(savedRole);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
