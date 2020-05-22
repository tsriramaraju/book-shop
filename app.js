//#region mandatory stuff
const path = require("path");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const errorController = require("./controllers/errors");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const databaseConnection = require("./utils/database").mongoConnect;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
//#endregion

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use(errorController.get404);
databaseConnection(() => {
  app.listen(3000);
});
