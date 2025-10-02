"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redisTest_1 = __importDefault(require("./routes/redisTest"));
const chat_1 = __importDefault(require("./routes/chat"));
const restaurantCrud_1 = __importDefault(require("./routes/restaurantCrud"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Routes
app.use(redisTest_1.default);
app.use(chat_1.default);
app.use(restaurantCrud_1.default);
app.get('/', (req, res) => res.send('🚀 Restaurant AI API is running!'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
