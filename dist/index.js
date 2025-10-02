"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const chat_1 = __importDefault(require("./routes/chat"));
const restaurants_1 = __importDefault(require("./routes/restaurants"));
const restaurantCrud_1 = __importDefault(require("./routes/restaurantCrud"));
const redisTest_1 = __importDefault(require("./routes/redisTest"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Routes
app.get("/", (req, res) => {
    res.json({ message: "🚀 Restaurant AI API is running!" });
});
app.use("/chat", chat_1.default);
app.use("/restaurants", restaurants_1.default);
app.use("/restaurant-crud", restaurantCrud_1.default);
app.use("/redis-test", redisTest_1.default);
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
