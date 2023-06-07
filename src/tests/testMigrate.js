const User = require("../models/User");
const sequelize = require("../utils/connection");
require("../models/User");
require("../models/Category");
require("../models");
const main = async () => {
  try {
    await sequelize.sync({ force: true });

    await User.create({
      firstName: "sendy",
      lastName: "neisca",
      email: "yelieea%@gmail.com",
      password: "$2b$10$H",
      phone: "32334455",
    });

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

main();
