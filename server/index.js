const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { pool } = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const getTables = (req, res) => {
  pool.query('SELECT * FROM tables', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const addTable = (req, res) => {
  const { code, observations } = req.body;

  pool.query(
    'INSERT INTO Tables (code, observations) VALUES ($1, $2)',
    [code, observations],
    error => {
      if (error) {
        res.status(400).json({status:'unsucess' ,message: 'Can not insert table'});
      }else{
        res.status(201).json({status: 'Success', message:'Table Added', description:`Code: ${code}, Observations:${observations}`})
      }
    },
  );
};

const updateTable = (req, res) => {
  const id = req.params.id;
  const {code, observations}= req.body;
  pool.query('UPDATE Tables SET code = $1, observations = $2 where id = $3',
  [code, observations, id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Table modified with ID: ${id}`)
  });
};
const deleteTable = (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM Tables WHERE id = $1',
  [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Table deleted with ID: ${id}`)
  });
};

app
  .route('/tables')
  .get(getTables)
  .post(addTable);

app.route('/tables/:id')
   .put(updateTable)
   .delete(deleteTable);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
