'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    posts: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User, {
    	foreignKey: 'user_id'
    });
  };
  return Post;
};