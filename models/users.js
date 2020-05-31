const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          require: true,
        },
        quantity: {
          type: Number,
          require: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const productIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  let updatedQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (productIndex >= 0) {
    updatedQuantity = this.cart.items[productIndex].quantity + 1;
    updatedCartItems[productIndex].quantity = updatedQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: updatedQuantity,
    });
  }
  this.cart.items = updatedCartItems;
  this.save();
};
userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};
userSchema.methods.clearCart = function (productId) {
  this.cart.items = [];
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
