const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const dbConnect = require("../server/src/configs/database");
const cdConnect = require("../server/src/configs/cloudinary");

// Import routes individually
const authRoutes = require("../server/src/routes/authRoutes");
const userRoutes = require("../server/src/routes/userRoutes");
const postRoutes = require("../server/src/routes/postRoutes");
const likeRoutes = require("../server/src/routes/likeRoutes");
const messageRoutes = require("../server/src/routes/messageRoutes");
const commentRoutes = require("../server/src/routes/commentRoutes");
const friendRoutes = require("../server/src/routes/friendRoutes");
const notificationRoutes = require("../server/src/routes/notificationRoutes");

const app = express();

const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Connect to database
dbConnect();

// Initialize Cloudinary config
cdConnect();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/likes", likeRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/friends", friendRoutes);
app.use("/api/v1/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send(`<h4>server running at PORT ${process.env.PORT}</h4>`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something broke!", error: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`server running at port ${process.env.PORT}`);
});
