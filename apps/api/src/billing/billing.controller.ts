import { Body, Controller, Headers, HttpCode, Post, RawBodyRequest, Req } from '@nestjs/common';
import { Request } from 'express';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('checkout-session')
  createCheckoutSession(@Body() body: { email: string; priceId: string }) {
    return this.billingService.createCheckoutSession(body.email, body.priceId);
  }

  @Post('webhook')
  @HttpCode(200)
  handleWebhook(@Req() req: RawBodyRequest<Request>, @Headers('stripe-signature') signature: string) {
    const event = this.billingService.constructWebhookEvent(req.rawBody as Buffer, signature);
    return { received: true, type: event.type };
  }
}
