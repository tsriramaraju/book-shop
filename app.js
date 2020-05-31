//#region mandatory stuff
const path = require("path");

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const errorController = require("./controllers/errors");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const User = require("./models/users");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
//#endregion
app.use((req, res, next) => {
  User.findById("5eca4065b2895a221cbd98f8")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});
app.use("/admin", adminData.routes);
app.use(shopRoutes);
console.clear();
app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://sriram:login123@projectcave-mz6ni.mongodb.net/shop?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Max",
          email: "max@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  });
