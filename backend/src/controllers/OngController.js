const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
	async index (req, res) {
		const ongs = await connection('ongs').select('*')
		return res.json(ongs);
	},
	async store (req, res) {
		const { name, email, whatsapp, city, uf } = req.body;

		const id = crypto.randomBytes(4).toString('HEX');
		const ong = { id, name, email, whatsapp, city, uf };

		await connection('ongs').insert(ong);

		res.json({ id });
	}
}