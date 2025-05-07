import { Blog } from "./blog";
import { User } from "./user";
import { ReadingList } from "./readingList";
import { Session } from "./session";
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

Session.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export { Blog, User, ReadingList, Session };
