import cors from "cors";
import express from "express";
import { serve } from "inngest/express";
import path from "path";
import { connectDB } from "./Db/db.js";
import { ENV } from "./lib/env.js";
import { functions, inngest } from "./lib/inngest.js";

const app = express();

const __dirname = path.resolve();

//middlewares
app.use(express.json())

//credentials means we can send cookies from frontend to backend
app.use(cors({
  origin: ENV.FRONTEND_URL,
  credentials: true,
}));

app.use("/api/inngest", serve({ client: inngest, functions }))

app.get("/api", (req, res) => {
  res.status(200).json("Hello World!");
});

app.get("/books", (req, res) => {
  res.status(200).json("Hello Book!");
});

//for deployment on sevalla
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {console.log(`Server is running on port ${ENV.PORT}`);});
  } catch (error) {
    console.error("Server failed to start🤡:", error);
  }
};

startServer();
