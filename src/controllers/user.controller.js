import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User, Course, Purchase } from "../models/index.js";
import { JWT_USER_PASSWORD } from "../config/index.js";
import { userSignupSchema, userSigninSchema } from "../validators/index.js";

export async function signup(req, res) {
  const parsed = userSignupSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid data" });
  }
  const { email, password, firstName, lastName } = parsed.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    res.status(409).json({ message: "User already exists" });
  }
}

export async function signin(req, res) {
  const parsed = userSigninSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid data" });
  }
  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(403).json({ message: "Invalid credentials" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(403).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_USER_PASSWORD,
    {
      expiresIn: "1h",
    },
  );
  res.json({ token });
}

export async function getPurchases(req, res) {
  const purchases = await Purchase.find({ userId: req.userId });
  const courseIds = purchases.map((p) => p.courseId);

  const courses = await Course.find({
    _id: { $in: courseIds },
  });

  res.json({ purchases, courses });
}
