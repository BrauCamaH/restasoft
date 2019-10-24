const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const tableRoutes = require('./api/routes/tables');
const usersRoutes = require('./api/routes/users');
const clientsRoutes = require('./api/routes/clients');
const categoriesRoutes = require('./api/routes/categories');
const productsRoutes = require('./api/routes/products');
const cookieParser = require('cookie-parser');

app.use(morgan('dev'));
app.use(express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

//Routes
app.use('/api/tables', tableRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
