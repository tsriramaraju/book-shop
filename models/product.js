const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Product", productSchema);

// const mongodb = require("mongodb");
// const getDb = require("../utils/database").getDb;

// class Product {
//   constructor(id, title, price, description, imageUrl) {
//     this._id = id ? new mongodb.ObjectID(id) : null;
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then((result) => {
//         return result;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static fetchProducts() {
//     const db = getDb();
//     const dbOp = db.collection("products").find().toArray();
//     return dbOp
//       .then((products) => {
//         // console.log(products);
//         return products;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static getProductById(id) {
//     const db = getDb();
//     const dbOp = db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectID(id) })
//       .toArray();
//     return dbOp
//       .then((product) => {
//         // console.log(products);
//         return product;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static deleteProduct(id) {
//     const db = getDb();
//     const dbOp = db
//       .collection("products")
//       .deleteOne({ _id: new mongodb.ObjectID(id) });
//     return dbOp
//       .then((result) => {
//         return result;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }

// module.exports = Product;
