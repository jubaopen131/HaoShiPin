import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class BillingService {
  private readonly stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2024-06-20'
    });
  }

  createCheckoutSession(customerEmail: string, priceId: string) {
    return this.stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: customerEmail,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: 'http://localhost:3000/billing/success',
      cancel_url: 'http://localhost:3000/billing/cancel'
    });
  }

  constructWebhookEvent(payload: Buffer, signature: string) {
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  }
}
