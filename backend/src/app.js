import express from 'express';
import cors from 'cors';
import pool from './db/config.js';
import {z} from 'zod';
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "users_avatar",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});
const upload = multer({ storage: storage });

const requiredString = (fieldName, maxLen) => {
  let schema = z.string().trim().min(1, `${fieldName} required`);
  if (maxLen) schema = schema.max(maxLen, `${fieldName} max ${maxLen} characters`);
  return schema;
};

export const Schema = {
  users: z.object({
    username: requiredString("username", 15),
    email: z.string().trim().email("invalid email format"),
    pass: requiredString("password").min(6, "password must be at least 6 characters"),
    img: requiredString("image"),
  }),
  login: z.object({
    email: z.string().trim().email("invalid email format"),
    pass: requiredString("password"),
  }),
  categories: z.object({
    category: requiredString("category"),
  }),
  plans: z.object({
    plan: requiredString("plan"),
    price: z.coerce.number().min(0, "price required"),
    cycle: requiredString("cycle"),
    descriptions: requiredString("descriptions"),
  }),
  books: z.object({
    category_id: z.coerce.number().int().min(1, "ID invalid"),
    title: requiredString("title"),
    writer: requiredString("writer"),
    cover: z.string().optional(),
    content: requiredString("content"),
  }),
  saved: z.object({
    users_id: z.coerce.number().int().min(1, "ID invalid"),
    book_id: z.coerce.number().int().min(1, "ID invalid"),
  }),
  subscriptions: z.object({
    user_id: z.coerce.number().int().min(1, "ID invalid"),
    plan_id: z.coerce.number().int().min(1, "ID invalid"),
    status: requiredString("status"),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
  }),
};

const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues });
    }
    req.body = result.data;
    next();
  };
};

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token tidak ditemukan" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || JWT_SECRET);
    next();
  } catch {
    return res.status(403).json({ error: "Token tidak valid" });
  }
};

app.post("/api/v1/register", upload.single("img"), (req, res, next) => {
  if (req.file) {
    req.body.img = req.file.path;
  }
  next();
}, validate(Schema.users), async (req, res) => {
  const { username, email, pass, img } = req.body;

    try {
      const [result] = await pool.query(
        "INSERT INTO users (username, email, pass, img) VALUES (?, ?, ?, ?)",
        [username, email, pass, img]
      );

      res.json({ success: true, message: "register successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Database error" });
    }
  }
);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
