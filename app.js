//#region mandatory stuff
const path = require("path");

const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const errorController = require("./controllers/errors");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const User = require("./models/users");

const mongoURL =
  "mongodb+srv://sriram:login123@projectcave-mz6ni.mongodb.net/shop?retryWrites=true&w=majority";
const sessionStorage = new MongoDbStore({
  uri: mongoURL,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "I wont tell",
    name: "my first session practice",
    resave: false,
    saveUninitialized: false,
    store: sessionStorage,
  })
);
//#endregion
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});
app.use("/admin", adminData.routes);
app.use(shopRoutes);
app.use(authRoutes);
console.clear();
app.use(errorController.get404);

mongoose
  .connect(mongoURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
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
