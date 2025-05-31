import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

dotenv.config();

import dbConnect from "./src/config/database.js";
import routes from "./src/route/routes.js";

const app = express();

// Trust first proxy (important if deploying behind proxies/load balancers like Vercel, Heroku)
app.set("trust proxy", 1);

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration - adjust origin to your frontend deployment URL
app.use(
  cors({
    origin: ["http://localhost:5173",`https://mind-space-plus.vercel.app`], // <-- your frontend URL here
    credentials: true, // allow cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// Connect to database
dbConnect();

// Mount API routes under /api/v1
app.use("/api/v1", routes);

// Health check route
app.get("/", (req, res) => {
  res.send(`<h4>🚀 Server running on PORT ${process.env.PORT || 5000}</h4>`);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
