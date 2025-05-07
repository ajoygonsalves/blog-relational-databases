import { Blog } from "./blog";
import { User } from "./user";
import { ReadingList } from "./readingList";
Blog.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(Blog, {
  foreignKey: "userId",
  as: "blogs",
});

User.belongsToMany(Blog, {
  through: ReadingList,
});

Blog.belongsToMany(User, {
  through: ReadingList,
});

export { Blog, User, ReadingList };
