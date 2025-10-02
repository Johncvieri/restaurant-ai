import dotenv from 'dotenv';
dotenv.config();

// Dummy stripe client untuk development
class DummyStripe {
  paymentIntents = {
    create: async (opts: any) => ({ id: 'pi_dummy', amount: opts.amount, currency: opts.currency })
  };
}

export const stripe = process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.length > 0
  ? require('stripe')(process.env.STRIPE_SECRET_KEY)
  : new DummyStripe();

console.log('Stripe initialized (real or dummy)');
