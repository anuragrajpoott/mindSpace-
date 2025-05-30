import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

dotenv.config();

import dbConnect from "./src/config/database.js";

// Import your combined routes file (assuming you saved it as src/routes/apiRoutes.js)
import routes from "./src/route/routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "https://mind-space-plus.vercel.app/", credentials: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

dbConnect();

// Mount all your combined API routes under /api/v1
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send(`<h4>🚀 Server running on PORT ${process.env.PORT || 5000}</h4>`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
