"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Dummy stripe client untuk development
class DummyStripe {
    constructor() {
        this.paymentIntents = {
            create: async (opts) => ({ id: 'pi_dummy', amount: opts.amount, currency: opts.currency })
        };
    }
}
exports.stripe = process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.length > 0
    ? require('stripe')(process.env.STRIPE_SECRET_KEY)
    : new DummyStripe();
console.log('Stripe initialized (real or dummy)');
