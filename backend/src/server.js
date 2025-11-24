import { clerkMiddleware } from '@clerk/express';
import cors from "cors";
import express from "express";
import { serve } from "inngest/express";
import path from "path";
import { connectDB } from "./Db/db.js";
import { ENV } from "./lib/env.js";
import { functions, inngest } from "./lib/inngest.js";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";



const app = express();

const __dirname = path.resolve();

//credentials means we can send cookies from frontend to backend
app.use(cors({
  origin: ENV.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));


//middlewares
app.use(express.json())

app.use(clerkMiddleware());// this adds auth fileds to request object: req.auth() we can say



//routes
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes)
app.use("/api/sessions", sessionRoutes)






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
