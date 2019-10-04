const express = require('express');
const router = express.Router();

const TablesController = require('../controllers/tables');

router.get('/', TablesController.getTables);
router.post('/', TablesController.getTables);

router.put('/:id', TablesController.updateTable);
router.delete('/:id', TablesController.deleteTable);

module.exports = router;