require('dotenv').config();
const Sequelize = require('sequelize');

var fs = require('fs');
var path = require('path');
const config = require('.');

const db = {};

const sequelize = new Sequelize(
  config.postgres.db,
  config.postgres.user,
  config.postgres.password,
  {
    dialect: 'postgres',
    port: config.postgres.port,
    host: config.postgres.host,
  },
);

//Check for success connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync({ force: false });

const modelsDir = path.normalize(`${__dirname}/../api/models`);

fs.readdirSync(modelsDir)
  .filter(file => {
    return file.indexOf('.') !== 0 && file.indexOf('.map');
  })
  .forEach(file => {
    console.info(`Loading model file ${file}`);
    const model = sequelize.import(path.join(modelsDir, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
