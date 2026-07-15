const express = require("express");
const path = require("path");

const sequelize = require("./config/connection");
require("./models");

const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;



app.use(express.json());


app.use(express.urlencoded({ extended: true }));




app.use(express.static(path.join(__dirname, "public")));



app.use(routes);


sequelize.sync().then(() => {
  app.listen(PORT, () => console.log("Server running on port " + PORT));


});