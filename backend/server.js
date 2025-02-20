const app = require("./app");
const { sequelize } = require("./models");

sequelize.sync().then(() => {
  console.log("Database synced");
});
