const db = require('../models');

const Clients = db.clients;

exports.getClients = (req, res) => {
  Clients.findAll({
    order: ['id'],
  })
    .then(client => res.json(client))
    .catch(e => res.json({ err: e }));
};

exports.addClient = (req, res) => {
  const { rfc, name, city, address, zipcode, colony, phone } = req.body;

  const client = Clients.build({
    rfc: rfc,
    name: name,
    city: city,
    address: address,
    zipcode: zipcode,
    colony: colony,
    phone: phone,
  });

  client
    .save()
    .then(client => res.status(200).json(client))
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.updateClient = (req, res) => {
  const id = req.params.id;
  const { rfc, name, city, address, zipcode, colony, phone } = req.body;
  Clients.update(
    {
      rfc: rfc,
      name: name,
      city: city,
      address: address,
      zipcode: zipcode,
      colony: colony,
      phone: phone,
    },
    {
      where: {
        id: id,
      },
    },
  )
    .then(() => {
      res.status(200).send(`Client updated with ID: ${id}`);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
};
exports.deleteClient = (req, res) => {
  const id = req.params.id;
  Clients.destroy({
    where: {
      id: id,
    },
  })
    .then(() => res.status(200).send(`Client deleted with ID: ${id}`))
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
};
