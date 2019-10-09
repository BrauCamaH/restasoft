const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const tableRoutes = require('./api/routes/tables');
const usersRoutes = require('./api/routes/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Routes
app.use('/api/tables', tableRoutes);
app.use('/api/users', usersRoutes);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
