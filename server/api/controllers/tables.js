const { pool } = require('../config/config');
exports.getTables = (req, res) => {
  pool.query('SELECT * FROM tables', (error, results) => {
    if (error) {
      res.status(500).json({
        error: err,
      });
    }
    res.status(200).json(results.rows);
  });
};

exports.addTable = (req, res) => {
  const { code, observations } = req.body;

  pool.query(
    'INSERT INTO Tables (code, observations) VALUES ($1, $2)',
    [code, observations],
    error => {
      if (error) {
        res
          .status(400)
          .json({ status: 'unsucess', message: 'Can not insert table' });
      } else {
        res.status(201).json({
          status: 'Success',
          message: 'Table Added',
          description: `Code: ${code}, Observations:${observations}`,
        });
      }
    },
  );
};

exports.updateTable = (req, res) => {
  const id = req.params.id;
  const { code, observations } = req.body;
  pool.query(
    'UPDATE Tables SET code = $1, observations = $2 where id = $3',
    [code, observations, id],
    (error, results) => {
      if (error) {
        res.status(500).json({
          error: err,
        });
      }
      res.status(200).send(`Table modified with ID: ${id}`);
    },
  );
};
exports.deleteTable = (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM Tables WHERE id = $1', [id], (error, results) => {
    if (error) {
      res.status(500).json({
        error: err,
      });
    }
    res.status(200).send(`Table deleted with ID: ${id}`);
  });
};
