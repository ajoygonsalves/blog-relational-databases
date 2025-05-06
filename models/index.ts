import { Blog } from "./blog";
import { User } from "./user";

Blog.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(Blog, {
  foreignKey: "userId",
  as: "blogs",
});

export { Blog, User };
