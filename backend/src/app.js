import express from "express";
import cors from "cors";
import "dotenv/config";
import pool from "./db/config.js";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

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

const benefitsStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "plan_benefits",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "svg"],
  },
});
const uploadBenefits = multer({ storage: benefitsStorage });

const requiredString = (fieldName, maxLen) => {
  let schema = z.string().trim().min(1, `${fieldName} required`);
  if (maxLen)
    schema = schema.max(maxLen, `${fieldName} max ${maxLen} characters`);
  return schema;
};

const injectFile = (req, res, next) => {
  if (req.file) {
    req.body.img = req.file.path;
  }
  next();
};

export const Schema = {
  users: z.object({
    username: requiredString("username", 15),
    email: requiredString("email"),
    pass: requiredString("password").min(6, "password must be at least 6 characters",),
    img: requiredString("image"),
  }),
  login: z.object({
    email: requiredString("email"),
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
    synopsis: requiredString("synopsis"),
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
  plan_benefits: z.object({
    plan_id: z.coerce.number().int().min(1, "ID invalid"),
    badge_icon: z.string().nullable().optional(),
    username_border_color: z.string().max(20, "Hex/Color max 20 characters").nullable().optional(),
    avatar_border_color: z.string().max(20, "Hex/Color max 20 characters").nullable().optional(),
    banner_image: z.string().nullable().optional(),
  }),
  createSubscriptionSchema: z.object({
    user_id: z.coerce.number().int().min(1, "ID user tidak valid"),
    plan_id: z.coerce.number().int().min(1, "ID plan tidak valid"),
  })
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
  if (!token) return res.status(401).json({ error: "Token not found" });
  if (!token) {
    return res.status(401).json({ error: "Token tidak ditemukan "});
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ error: "Token tidak valid " + error.message });
  }
};

const generateAccessToken = (users) => {
  return jwt.sign(
    {
      id: users.id,
      username: users.username,
      email: users.email,
      subscription: subscription
      ? {
        plan_id: subscription.plan_id,
        status: subscription.status,
        start_date: subscription.start_date,
        end_date: subscription.end_date,
      }
      : null,
    },
    process.env.JWT_SECRET || JWT_SECRET,
    { expiresIn: "1d" }
  );
};

app.post("/api/v1/subscriptions/:user_id/:plan_id", authenticateToken, validate(Schema.createSubscriptionSchema), async (req, res) => {
  try {
      const { user_id, plan_id } = req.params;
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);
      const status = "active";
      const query = `INSERT INTO subscriptions (user_id, plan_id, status, start_date, end_date) VALUES (?, ?, ?, ?, ?) RETURNING *;`;
      const values = [user_id, plan_id, status, startDate, endDate];

      const result = await pool.query(query, values);

      return res.status(201).json({
        message: "Successfully subscribed for 1 month",
        data: result.rows[0],
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to create subscription" });
    }
  }
);

app.post("/api/v1/saved/:users_id/:book_id", authenticateToken, async (req, res) => {
  try {
    const { users_id, book_id } = req.params;
    const query = `INSERT INTO saved (users_id, book_id) VALUES (?, ?);`;
    const values = [users_id, book_id];

    const data = await pool.query(query, values);

    return res.status(201).json({
      message: "Book saved!",
      data: data.rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to save book" });
  }
});

// Endpoint 2: Edit Profile (menggunakan update terbaru: injectFile & Schema.editprofile)
app.put("/api/v1/users/:id", authenticateToken, upload.single("img"), injectFile, validate(Schema.editprofile), async (req, res) => {
  if (req.file) {
    req.body.img = req.file.path;
  }
  
  try {
    const { id } = req.params;
    const { username, pass, img } = req.body;
    const [rows] = await pool.query("UPDATE users SET username = ?, pass = ?, img = ? WHERE id = ?", [username, pass, img, id]);
    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "user not found" });
    }
    return res.json({ success: true, message: "successfully update profile" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "error to update profile data" });
  }
});

app.get("/api/v1/books", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM books");
    if(rows.length === 0) {
      return res.status(404).json({ error: "book not found" });
    }
    res.json({ books: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error to get books data" });
  }
});

app.get("/api/v1/plans", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM plans");
    if(rows.length === 0) {
      return res.status(404).json({ error: "plans not found" });
    }
    res.json({ plans: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error to get plans data" });
  }
});

app.get("/api/v1/categories", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM categories");
    if(rows.length === 0) {
      return res.status(404).json({ error: "category not found" });
    }
    res.json({ categories: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error to get category list" });
  }
});

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

app.post("/api/v1/login", validate(Schema.login), async (req, res) => {
  const { email, pass } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT id, email, pass FROM users WHERE email = ? AND pass = ?",
      [email, pass]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Email atau password salah" });
    }

    const users = rows[0];

    const token = jwt.sign({ id: users.id, email: users.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "login successfully", token });
  } catch (error) {
    res.status(500).json({ error: "login failed" });
  }
});

app.get("/api/v1/profile", authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, email, img FROM users WHERE id = ?",
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "user not found" });
    }

    res.json({ user: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error to get profile data" });
  }
});

app.post("/api/v1/post-books", upload.single("cover"), validate(Schema.books), async (req, res) => {
  if (req.file) {
    req.body.cover = req.file.path;
  }
  const { category_id, title, writer, cover, synopsis, content } = req.body;
  try {
    await pool.query(
      "INSERT INTO books (category_id, title, writer, cover, synopsis, content) VALUES (?, ?, ?, ?, ?, ?)",
      [category_id, title, writer, cover, synopsis, content]
    );
    res.json({ success: true, message: "successfully post book" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to post book" });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
