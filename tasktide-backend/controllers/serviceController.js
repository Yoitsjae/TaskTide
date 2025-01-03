const Service = require('../models/Service');

const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createService = async (req, res) => {
  const { title, description, price, location } = req.body;

  try {
    const service = new Service({
      title,
      description,
      price,
      location,
      providerId: req.user.id,
    });

    const createdService = await service.save();
    res.status(201).json(createdService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getServices, createService };
