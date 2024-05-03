import Domain from "../models/domain.model.js";
import Role from "../models/role.model.js";

export const insertMultipleDomains = async (req, res) => {
	try {
		const domainsData = req.body.domains;
		const results = [];

		for (const domainData of domainsData) {
			const foundRoles = await Role.find({
				RoleName: { $in: domainData.roles },
			}).exec();

			const roleIds = new Set(foundRoles.map((role) => role._id));

			let domain = await Domain.findOne({
				DomainName: domainData.DomainName,
			});
			if (!domain) {
				domain = new Domain({
					DomainName: domainData.DomainName,
					iconPath: domainData.iconPath,
					roles: Array.from(roleIds),
				});
			} else {
				// Update existing domain to add new roles
				domain.roles = [...new Set([...domain.roles, ...roleIds])];
			}

			const savedDomain = await domain.save();
			results.push(savedDomain);
		}

		res.status(201).json({
			message: "Domains inserted successfully",
			data: results,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error inserting domains",
			error: error.message,
		});
	}
};

export const searchDomains = async (req, res) => {
	const { role } = req.query;
	try {
		const roleObj = await Role.findOne({ RoleName: role }).exec();
		if (!roleObj) {
			return res.status(404).json({ message: "Role not found" });
		}
		const domains = await Domain.find({ roles: roleObj._id })
			.populate("roles")
			.exec();
		res.json({
			domains: domains.map((domain) => ({
				DomainId: domain._id,
				DomainName: domain.DomainName,
				iconPath: domain.iconPath,
			})),
		});
	} catch (error) {
		res.status(500).json({
			message: "Error fetching domains",
			error: error.message,
		});
	}
};
