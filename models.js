const mongoose = require('mongoose');

const discountSchema = mongoose.Schema({
  restaurant: {type: String, required: true},
  discount: {type: String, required: true},
  foodType: {type: String},
  discountType: {type: String},
  favorite: {type: Boolean}
});

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  favorites: [{type: Number}]
});

discountSchema.methods.apiRepr = function() {
  return {
    _id: this._id,
    restaurant: this.restaurant,
    discount: this.discount,
    foodType: this.foodType,
    discountType: this.discountType,
    favorite: this.favorite
  };
}

userSchema.methods.apiRepr = function() {
  return{ 
    id: this._id,
    username: this.username,
    password: this.password,
    favorites: this.favorites
  };
}

const Discounts = mongoose.model('Discounts', discountSchema);
const Users = mongoose.model('Users', userSchema);

module.exports = {Discounts, Users};
