import { Request, Response } from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import bcrypt from "bcrypt";

config();

interface RequestAuth extends Request {
  body: {
    email: string;
    password: string;
    confirmPassword: string;
  };
}

const hashPassword = (password: string) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const signUp = async (req: RequestAuth, res: Response) => {
  const { email, password, confirmPassword } = req.body;
  if (!email) {
    res.status(400).json({ message: "Username is required" });
    return;
  }

  if (!password) {
    res.status(400).json({ message: "Password is required" });
    return;
  }

  if (!confirmPassword) {
    res.status(400).json({ message: "Password confirmation is required" });
    return;
  }

  if (!(password === confirmPassword)) {
    res
      .status(400)
      .json({ message: "Password and confirmation password do not match" });
  }

  // Check if username exists in database
  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      email,
      passwordHash: await hashPassword(password),
    },
  });

  if (!created) res.status(409).json({ message: "Email already in use" });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" },
  );
  if (created)
    res
      .status(200)
      .json({ message: "User successfully signed up", accessToken: token });
};

export const logIn = async (req: RequestAuth, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  const user = await User.unscoped().findOne({ where: { email } });

  if (!user) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" },
  );

  res.status(200).json({ token });
};
