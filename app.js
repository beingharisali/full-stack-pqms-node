require("dotenv").config();
const express = require("express");
const app = express();

// security
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");

// db
const connectDB = require("./db/connect");

// routes
const authRouter = require("./routes/auth");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, limit: 100 }));
app.use(helmet());

// routes
app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

connectDB(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error.message);
  });
