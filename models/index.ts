import { Blog } from "./blog";
import { User } from "./user";

Blog.sync();
User.sync();

export { Blog, User };
