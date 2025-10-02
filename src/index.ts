import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import chatRoutes from "./routes/chat";
import restaurantRoutes from "./routes/restaurants";
import restaurantCrudRoutes from "./routes/restaurantCrud";
import redisTestRoutes from "./routes/redisTest";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "🚀 Restaurant AI API is running!" });
});

app.use("/chat", chatRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/restaurant-crud", restaurantCrudRoutes);
app.use("/redis-test", redisTestRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
