const express = require('express');
const router = express.Router();

const ClientsController = require('../controllers/clients');
const checkAuth = require('../middlewares/auth.js');

router.get('/', ClientsController.getClients);
router.post('/', ClientsController.addClient);

router.put('/:id', ClientsController.updateClient);
router.delete('/:id', ClientsController.deleteClient);

module.exports = router;
