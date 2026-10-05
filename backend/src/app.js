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

const requireActiveSubscription = (req, res, next) => {
  const sub = req.user?.subscriptions;

  if (!sub) {
    return res.status(403).json({
      error: "Access Denied: You Need To Subscribe First",
    });
  }

  if (sub.status !== "active") {
    return res.status(403).json({
      error: "Access Denied: Subscription Status Not Active",
    });
  }

  const now = new Date();
  const endDate = new Date(sub.end_date);

  if (now > endDate) {
    return res.status(403).json({
      error: "Access Denied: Subscription Expired",
    });
  }

  next();
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

app.post("/api/v1/subscriptions/:user_id/:plan_id", authenticateToken, async (req, res) => {
    try {
      const { user_id, plan_id } = req.params;

      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);
      const status = "active";

      const query = `INSERT INTO subscriptions (user_id, plan_id, status, start_date, end_date) VALUES (?, ?, ?, ?, ?);`;
      const values = [user_id, plan_id, status, startDate, endDate];

      const result = await pool.query(query, values);

      if (!result.rows || result.rows.length === 0) {
        return res.status(400).json({ error: "Failed to Save Subscription Data" });
      }

      const newSubscription = result.rows[0];

      const token = generateAccessToken(req.user, newSubscription);

      return res.status(201).json({
        message: "Successfully Subscribed For 1 Month",
        token,
        data: newSubscription,
      });
    } catch (error) {
      console.error("Error creating subscription:", error);
      return res.status(500).json({ error: "Failed To Create Subscription" + error.message });
    }
  }
);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
