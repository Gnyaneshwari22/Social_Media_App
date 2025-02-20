const { Sequelize } = require("sequelize");
const config = require("../config/config.json");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Post = require("./post")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);

// Ensure consistent foreign key definition
db.Post.hasMany(db.Comment, { foreignKey: "postId", as: "comments" });
db.Comment.belongsTo(db.Post, { foreignKey: "postId", as: "post" });

module.exports = db;
