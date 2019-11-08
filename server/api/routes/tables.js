const express = require('express');
const router = express.Router();

const TablesController = require('../controllers/tables');

router.get('/', TablesController.getTables);
router.get('/:id', TablesController.getTableById);
router.post('/', TablesController.addTable);

router.put('/:id', TablesController.updateTable);
router.delete('/:id', TablesController.deleteTable);

module.exports = router;
