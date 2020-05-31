// const mongoDB = require("mongodb");
// const mongoClient = mongoDB.MongoClient;

// let _db;

// const mongoConnect = (cb) => {
//   mongoClient
//     .connect(
//       "mongodb+srv://sriram:login123@projectcave-mz6ni.mongodb.net/test?retryWrites=true&w=majority",
//       { useUnifiedTopology: true }
//     )
//     .then((client) => {
//       _db = client.db("shop");
//       cb(client);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// const getDb = () => {
//   if (_db) {
//     return _db;
//   } else {
//     throw console.error();
//   }
// };

// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;
