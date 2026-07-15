const User = require("./user");

const Post = require("./post");

const Category = require("./category");

// users can have lots of posts a post belongs to the user
User.hasMany(Post, {
  foreignKey: "userId",
  onDelete: "CASCADE",

});

Post.belongsTo(User, {
  foreignKey: "userId",
});



Category.hasMany(Post, {
  foreignKey: "categoryId",
  as: "category",

});

Post.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",

});




module.exports = { User, Post, Category };