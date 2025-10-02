"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Dummy supabase client untuk development
class DummySupabase {
    async from(table) {
        return { select: async () => ({ data: [], error: null }) };
    }
}
exports.supabase = process.env.SUPABASE_URL && process.env.SUPABASE_KEY
    ? require('@supabase/supabase-js').createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
    : new DummySupabase();
console.log('Supabase initialized (real or dummy)');
