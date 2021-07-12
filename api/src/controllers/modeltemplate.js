class ModelTemplate {
	constructor(model) {
		this.model = model;
	}
	get(config) {
		return this.model.findAll(config);
	}
	add(object) {
		return this.model.create(object);
	}
	edit(object, id) {
		return this.model.update(object, {
			where: {
				id,
			},
		});
	}
	delete(id) {
		return this.model.destroy({
			where: {
				id,
			},
		});
	}
}

module.exports = ModelTemplate;
